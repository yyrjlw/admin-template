export interface LocalStorageKey {
  token: string;
}
type StorageType = 'local' | 'session';

export class StorageUtil {
  storage: Storage;

  constructor(storageType: StorageType) {
    this.storage = storageType === 'local' ? window.localStorage : window.sessionStorage;
  }
  getItem<T extends keyof LocalStorageKey = keyof LocalStorageKey>(
    key: T,
  ): LocalStorageKey[T] | null {
    const result = this.storage.getItem(key);
    if (result === null) return result;
    try {
      return JSON.parse(result);
    } catch (error) {
      return result;
    }
  }
  setItem<T extends keyof LocalStorageKey = keyof LocalStorageKey>(
    key: T,
    value: LocalStorageKey[T],
  ) {
    this.storage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  }
  removeItem<T extends keyof LocalStorageKey = keyof LocalStorageKey>(key: T) {
    this.storage.removeItem(key);
  }
}
