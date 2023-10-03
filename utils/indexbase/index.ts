import type {
  DBOptions,
  IBaseObjectStore,
  IBaseVersionChangeEvent,
  ObjectStoreParameters,
  StoreValue,
  IBaseIndexConfig,
} from './types';
import { raise } from '../errors';

const dbNameRequestMap: Map<string, IDBOpenDBRequest> = new Map();

function openDB(dbName: string, version?: number | undefined) {
  const openedDB = indexedDB.open(dbName, version);
  return openedDB;
}

export function closeDB(db: IDBDatabase) {
  dbNameRequestMap.delete(db.name);
  db.close();
}

export function getIndexBase(
  dbName: string,
  dbOptions: DBOptions,
  version?: number | undefined
) {
  return new Promise<IDBDatabase>((resolve, reject) => {
    if (dbNameRequestMap.has(dbName)) {
      return raise(`There is already a connection to this database.`);
    }
    dbNameRequestMap.set(dbName, openDB(dbName, version));
    const dbRequest = dbNameRequestMap.get(dbName)!;

    function upgrade(e: IDBOpenDBRequestEventMap['upgradeneeded']) {
      dbOptions.defineSchema(e as IBaseVersionChangeEvent);
      dbRequest.removeEventListener('upgradeneeded', upgrade);
    }

    function success(e: Event) {
      const result = (e.currentTarget as IDBOpenDBRequest).result;
      resolve(result);
      dbRequest.removeEventListener('success', success);
    }

    function error(e: Event) {
      const reqError = (e.currentTarget as IDBOpenDBRequest).error;
      reject(reqError?.message);
      dbRequest.removeEventListener('error', error);
    }

    function blocked() {
      reject('Database access was blocked');
      dbRequest.removeEventListener('error', error);
    }
    dbRequest.addEventListener('upgradeneeded', upgrade);
    dbRequest.addEventListener('success', success);
    dbRequest.addEventListener('error', error);
    dbRequest.addEventListener('blocked', blocked);
  });
}

export function objectStoreContains(db: IDBDatabase, storeName: string) {
  return db.objectStoreNames.contains(storeName);
}

export function deleteObjectStore(db: IDBDatabase, storeName: string) {
  if (objectStoreContains(db, storeName)) db.deleteObjectStore(storeName);
}

/**
 * Retrieves an objectStore if it exists, else creates and rejects.
 * ```js
 * import { getIndexBase, objectStore } from 'indexbase';
 * const DB = await getIndexBase('notes-app');
 * const notesStore = await objectStore(DB, 'notes', { keyPath: 'id' });
 * ```
 */
export function objectStore<S extends any = any, K extends string = string>(
  db: IDBDatabase,
  storeName: string,
  options?: ObjectStoreParameters<K>
) {
  return new Promise<IBaseObjectStore<S, K>>(async (resolve, reject) => {
    if (db.objectStoreNames.contains(storeName)) {
      // open a transaction on the db open request, return the store;
      const dbTransactionPromise = await transaction(
        db,
        storeName,
        'readwrite'
      );

      const objectStore = await getObjectStore(dbTransactionPromise, storeName);
      resolve(objectStore as IBaseObjectStore<S, K>);
    } else {
      reject('Object store not found');
    }
  });
}

/**
 * synchronously creates an objectStore when an upgrade event handler is called.
 * should be called within the defineSchema method of the getIndexBase function to work.
 */
export function createObjectStore<K>(
  db: IDBDatabase,
  name: string,
  options?: ObjectStoreParameters<K>
) {
  return new Promise<IBaseObjectStore<any, any>>(async (resolve) => {
    if (db.objectStoreNames.contains(name)) {
      // open a transaction on the db open request, return the store;
      const dbTransactionPromise = await transaction(
        db,
        name,
        'readwrite',
        true
      );

      const objectStore = await getObjectStore(dbTransactionPromise, name);
      return resolve(objectStore as IBaseObjectStore<any, any>);
    }
    const objStore = db.createObjectStore(name, options as any);
    resolve(objStore as IBaseObjectStore<any, any>);
  });
}

/**
 * Creates a new transaction and return it
 * ```js
 * import { getIndexBase, transaction } from 'indexbase';
 * const DB = await getIndexBase('notes-app');
 * const notesTransaction = await transaction(DB, 'notes', 'readwrite');
 * ```
 */
export function transaction(
  db: IDBDatabase,
  name: string | string[],
  mode?: IDBTransactionMode,
  upgrade = false
) {
  return new Promise<IDBTransaction>((resolve) => {
    const dbRequest = dbNameRequestMap.get(db.name)!;
    function handleSuccess(e: any) {
      const result = (e.currentTarget as IDBOpenDBRequest).result;
      const IDBtransaction = result.transaction(name, mode || 'readwrite');
      resolve(IDBtransaction);
      dbRequest.removeEventListener('success', handleSuccess);
    }
    dbRequest.addEventListener('success', handleSuccess);

    !upgrade && dbRequest.dispatchEvent(new Event('success'));
  });
}

function getObjectStore(transaction: IDBTransaction, storeName: string) {
  return new Promise<IDBObjectStore>((resolve) => {
    const objStore = transaction.objectStore(storeName);
    resolve(objStore);
  });
}

/**
 * Creates an active transaction and puts data into the objectStore returned by the transaction.
 * ```js
 * import { setRecord, getIndexBase, objectStore } from 'indexbase';
 * const DB = await getIndexBase('notes-app');
 * const notesStore = await objectStore(DB, 'notes', { keyPath: 'id' });
 * const button = document.querySelector('button');
 *
 * button.addEventListener('click', (e) => {
 *  setRecord(notesStore, {
 *    createdDate: new Date(),
 *    title: 'Note title',
 *  })
 * })
 * ```
 */
export async function setRecord<
  P extends any,
  S extends IBaseObjectStore<P, any>
>(
  store: S,
  value: StoreValue<S>,
  key?: IDBValidKey | undefined
): Promise<void> {
  const storeName = store.name;
  const DB = store.transaction.db;
  const newActiveTransaction = await transaction(DB, storeName);
  const objectStore = await getObjectStore(newActiveTransaction, storeName);
  objectStore.put(value, key);
  newActiveTransaction.commit();
}

/**
 * Creates an active transaction and adds data into the objectStore returned by the transaction.
 * ```js
 * import { addRecord, getIndexBase, objectStore } from 'indexbase';
 * const DB = await getIndexBase('notes-app');
 * const notesStore = await objectStore(DB, 'notes', { keyPath: 'id' });
 * const button = document.querySelector('button');
 *
 * button.addEventListener('click', (e) => {
 *  addRecord(notesStore, {
 *    createdDate: new Date(),
 *    title: 'Note title',
 *  })
 * })
 * ```
 */
export async function addRecord<
  P extends any,
  S extends IBaseObjectStore<P, any>
>(store: S, value: StoreValue<S>, key?: IDBValidKey | undefined) {
  const storeName = store.name;
  const DB = store.transaction.db;
  const newActiveTransaction = await transaction(DB, storeName);
  const objectStore = await getObjectStore(newActiveTransaction, storeName);
  objectStore.add(value, key);
  newActiveTransaction.commit();
}

/**
 * Removes all data from an objectStore.
 * ```js
 * import { clearRecords, getIndexBase, objectStore } from 'indexbase';
 * const DB = await getIndexBase('notes-app');
 * const notesStore = await objectStore(DB, 'notes', { keyPath: 'id' });
 * const button = document.querySelector('button');
 *
 * button.addEventListener('click', (e) => {
 *  clearRecords(notesStore)
 * })
 * ```
 */
export async function clearRecords(store: IBaseObjectStore<any, string>) {
  const storeName = store.name;
  const DB = store.transaction.db;
  const newActiveTransaction = await transaction(DB, storeName);
  const objectStore = await getObjectStore(newActiveTransaction, storeName);
  objectStore.clear();
  newActiveTransaction.commit();
}

/**
 * Uses a key to get a certain record.
 * ```js
 * import { getRecord, getIndexBase, objectStore } from 'indexbase';
 * const DB = await getIndexBase('notes-app');
 * const notesStore = await objectStore(DB, 'notes', { keyPath: 'id' });
 * const button = document.querySelector('button');
 *
 * button.addEventListener('click', (e) => {
 *  getRecord(notesStore, 1)
 * })
 * ```
 */
export function getRecord<T>(
  store: IBaseObjectStore<T, string>,
  key: IDBValidKey | IDBKeyRange
) {
  return new Promise<T>(async (resolve) => {
    const storeName = store.name;
    const DB = store.transaction.db;
    const newActiveTransaction = await transaction(DB, storeName);
    const objectStore = await getObjectStore(newActiveTransaction, storeName);
    objectStore.get(key).addEventListener('success', (e) => {
      resolve((e.currentTarget as IDBRequest<T>).result);
      newActiveTransaction.commit();
    });
  });
}

/**
 * Uses a key or an IDBKeyRange to get an array of records.
 * ```js
 * import { getRecords, getIndexBase, objectStore } from 'indexbase';
 * const DB = await getIndexBase('notes-app');
 * const notesStore = await objectStore(DB, 'notes', { keyPath: 'id' });
 * const button = document.querySelector('button');
 *
 * button.addEventListener('click', (e) => {
 *  getRecords(notesStore, 1)
 * })
 * ```
 */
export function getRecords<T>(
  store: IBaseObjectStore<T, string>,
  query?: IDBValidKey | IDBKeyRange | null | undefined
) {
  return new Promise<T[]>(async (resolve) => {
    const storeName = store.name;
    const DB = store.transaction.db;
    const newActiveTransaction = await transaction(DB, storeName);
    const objectStore = await getObjectStore(newActiveTransaction, storeName);
    objectStore.getAll(query).addEventListener('success', (e) => {
      resolve((e.currentTarget as IDBRequest<T[]>).result);
      newActiveTransaction.commit();
    });
  });
}

/**
 * Uses a key or an IDBKeyRange to delete a record from an objectStore.
 * ```js
 * import { deleteRecord, getIndexBase, objectStore } from 'indexbase';
 * const DB = await getIndexBase('notes-app');
 * const notesStore = await objectStore(DB, 'notes', { keyPath: 'id' });
 * const button = document.querySelector('button');
 *
 * button.addEventListener('click', (e) => {
 *  deleteRecord(notesStore, 1)
 * })
 * ```
 */
export async function deleteRecord(
  store: IBaseObjectStore<any, string>,
  key: IDBValidKey | IDBKeyRange
) {
  const storeName = store.name;
  const DB = store.transaction.db;
  const newActiveTransaction = await transaction(DB, storeName);
  const objectStore = await getObjectStore(newActiveTransaction, storeName);
  objectStore.delete(key);
  newActiveTransaction.commit();
}

/**
 * Uses an index name to delete an index from an objectStore.
 * Throws an "InvalidStateError" DOMException if not called within an upgrade transaction.
 * ```js
 * import { deleteIndex, getIndexBase } from 'indexbase';
 * const DB = await getIndexBase(
 *  'notes-app',
 *  {
 *    upgrade(e) {
 *      const Db = e.currentTarget?.result!;
 *      objectStore(Db, 'notesStore', {
 *        keyPath: 'notesId',
 *        autoIncrement: false,
 *      }).then((notesStore) => {
 *        deleteIndex(notesStore, 'notesIndex')
 *      });
 *      return Db;
 *    },
 *  },
 *  5
 *);
 * ```
 */
export async function deleteIndex(
  store: IBaseObjectStore<any, string>,
  name: string
) {
  store.deleteIndex(name);
}

/**
 * Uses an index name to create an index from an objectStore.
 * Throws an "InvalidStateError" DOMException if not called within an upgrade transaction.
 * ```js
 * import { deleteIndex, getIndexBase } from 'indexbase';
 * const DB = await getIndexBase(
 *  'notes-app',
 *  {
 *    upgrade(e) {
 *      const Db = e.currentTarget?.result!;
 *      objectStore(Db, 'notesStore', {
 *        keyPath: 'notesId',
 *        autoIncrement: false,
 *      }).then((notesStore) => {
 *        createIndex(notesStore, { name: 'notesIndex', keyPath: 'notes' })
 *      });
 *      return Db;
 *    },
 *  },
 *  5
 *);
 * ```
 */
export async function createIndex(
  store: IBaseObjectStore<any, string>,
  config: IBaseIndexConfig
) {
  store.createIndex(config.name, config.keyPath, config.params);
}

export async function indexContains(
  store: IBaseObjectStore<any, string>,
  name: string
) {
  const storeName = store.name;
  const DB = store.transaction.db;
  const newActiveTransaction = await transaction(DB, storeName);
  const objectStore = await getObjectStore(newActiveTransaction, storeName);
  return objectStore.indexNames.contains(name);
}
