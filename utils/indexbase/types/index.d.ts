export type StoreValue<S extends IBaseObjectStore<any, any>> =
  S['schema'] extends { [id: string]: any }
    ? S['keyPathOrigin'] & S['schema']
    : S['schema'];

type IBaseObjectStore<T = any, K extends string> = IDBObjectStore & {
  /**
   * For internal use at the type level only, returns null.
   */
  keyPathOrigin: {
    [keypath in K]: IDBValidKey;
  };
  /**
   * For interanl use at the type level only, returns null
   */
  schema: T;
};

export type ObjectStoreParameters<K> = {
  keyPath: K;
  autoIncrement?: boolean;
};

export interface IBaseVersionChangeEvent extends IDBVersionChangeEvent {
  currentTarget: (EventTarget & IDBOpenDBRequest) | null;
}

export interface DBOptions {
  /**
   * upgrade event handler for when a new version of the database is requested.
   */
  defineSchema: (e: IBaseVersionChangeEvent) => void;
}

export type IBaseIndexConfig = {
  name: string;
  keyPath: string | string[];
  params?: IDBIndexParameters;
};
