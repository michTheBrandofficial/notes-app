export function initDB(dbName: string, version?: number): IDBOpenDBRequest {
  const DB = indexedDB?.open(dbName, version || undefined);
  return DB;
}
