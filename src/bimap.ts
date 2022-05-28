export class Bimap<K, V> implements Map<K, V> {
  public readonly [Symbol.toStringTag]: string = "Bimap";

  private readonly keyMap = new Map<K, V>();

  private readonly valueMap = new Map<V, K>();

  public get size(): number {
    return this.keyMap.size;
  }

  public constructor(entries?: Iterable<readonly [K, V]> | null) {
    if (entries) {
      for (const [key, value] of entries) {
        this.set(key, value);
      }
    }
  }

  public get(key: K): V | undefined {
    return this.keyMap.get(key);
  }

  public getByValue(value: V): K | undefined {
    return this.valueMap.get(value);
  }

  public set(key: K, value: V): this {
    this.delete(key);
    this.deleteByValue(value);

    this.keyMap.set(key, value);
    this.valueMap.set(value, key);

    return this;
  }

  public has(key: K): boolean {
    return this.keyMap.has(key);
  }

  public hasValue(value: V): boolean {
    return this.valueMap.has(value);
  }

  public entries(): IterableIterator<[K, V]> {
    return this.keyMap.entries();
  }

  public keys(): IterableIterator<K> {
    return this.keyMap.keys();
  }

  public values(): IterableIterator<V> {
   return this.keyMap.values();
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.keyMap[Symbol.iterator]();
  }

  public clear(): void {
    this.keyMap.clear();
    this.valueMap.clear();
  }

  public delete(key: K): boolean {
    const value = this.get(key);

    if (value === undefined) {
      return false;
    }

    this.keyMap.delete(key);
    this.valueMap.delete(value);

    return true;
  }

  public deleteByValue(value: V): boolean {
    const key = this.getByValue(value);

    if (key === undefined) {
      return false;
    }

    this.keyMap.delete(key);
    this.valueMap.delete(value);

    return true;
  }

  public forEach(callbackFn: (value: V, key: K, map: Bimap<K, V>) => void, thisArg?: any): void {
    const boundCallbackFn = callbackFn.bind(thisArg);

    for (const [key, value] of this) {
      boundCallbackFn(value, key, this);
    }
  }
}
