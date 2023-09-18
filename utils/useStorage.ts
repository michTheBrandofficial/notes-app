type StorageGetter<T> = () => T | null;
type StorageSetter<T> = (value: T) => T;

export const useStorage = <O, K extends StorageKey = StorageKey>(
  key: K
): [StorageGetter<O>, StorageSetter<O>] => {
  const getItem: StorageGetter<O> = () => {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    else return null;
  };

  const setItem: StorageSetter<O> = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  };

  return [getItem, setItem];
};
