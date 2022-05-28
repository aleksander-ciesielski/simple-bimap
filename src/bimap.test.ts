import { Bimap } from "./bimap";

describe("Bimap", () => {
  it("is iterable", () => {
    const bimap = new Bimap();
    expect(bimap[Symbol.iterator]).not.toBe(undefined);
  });

  describe("size", () => {
    it("returns a current amount of entries in the bimap", () => {
      const bimap = new Bimap([
        ["A", 1],
      ]);

      expect(bimap.size).toBe(1);
      bimap.set("B", 2);
      expect(bimap.size).toBe(2);
    });
  });

  describe("constructor", () => {
    it("creates an empty Bimap instance if no arguments are provided", () => {
      const bimap = new Bimap();
      expect(bimap.size).toBe(0);
    });

    it("creates an empty Bimap instance if null is provided", () => {
      const bimap = new Bimap(null);
      expect(bimap.size).toBe(0);
    });

    it("creates a Bimap with the entries given by the array", () => {
      const bimap = new Bimap([
        ["A", 1],
        ["B", 2],
      ]);

      expect(bimap.size).toBe(2);
      expect(bimap.get("A")).toBe(1);
      expect(bimap.get("B")).toBe(2);
      expect(bimap.getByValue(1)).toBe("A");
      expect(bimap.getByValue(2)).toBe("B");
    });

    it("creates a Bimap with the entries given by the custom iterable", () => {
      const iterable: Iterable<[string, number]> = {
        [Symbol.iterator]: function* () {
          yield ["A", 1];
          yield ["B", 2];
        }
      };

      const bimap = new Bimap(iterable);

      expect(bimap.size).toBe(2);
      expect(bimap.get("A")).toBe(1);
      expect(bimap.get("B")).toBe(2);
      expect(bimap.getByValue(1)).toBe("A");
      expect(bimap.getByValue(2)).toBe("B");
    });

    it("throws a TypeError if the given argument is non-iterable", () => {
      // @ts-expect-error
      expect(() => new Bimap(42));

      // @ts-expect-error
      expect(() => new Bimap("abc"));

      // @ts-expect-error
      expect(() => new Bimap({}));
    });
  });

  describe("toString", () => {
    it("returns '[object Bimap]'", () => {
      const bimap = new Bimap();
      expect(bimap.toString()).toBe("[object Bimap]");
    });
  });

  describe("get", () => {
    it("returns the value associated with the given key", () => {
      const bimap = new Bimap([
        ["A", 1],
        ["B", 2],
      ]);

      expect(bimap.get("A")).toBe(1);
      expect(bimap.get("B")).toBe(2);
    });

    it("returns undefined if the given key doesn't exist", () => {
      const bimap = new Bimap();
      expect(bimap.get("A")).toBe(undefined);
    });
  });

  describe("getByValue", () => {
    it("returns the key associated with the given value", () => {
      const bimap = new Bimap([
        ["A", 1],
        ["B", 2],
      ]);

      expect(bimap.getByValue(1)).toBe("A");
      expect(bimap.getByValue(2)).toBe("B");
    });

    it("returns undefined if the given value doesn't exist", () => {
      const bimap = new Bimap();
      expect(bimap.getByValue(1)).toBe(undefined);
    });
  });

  describe("set", () => {
    it("adds the given key and value to the bimap", () => {
      const bimap = new Bimap<string, number>();

      bimap.set("A", 1);
      bimap.set("B", 2);

      expect(bimap.get("A")).toBe(1);
      expect(bimap.get("B")).toBe(2);
    });

    it("deletes old entries associated with the given key or value", () => {
      const bimap = new Bimap<string, number>([
        ["A", 10],
        ["B", 20],
      ]);

      bimap.set("C", 20);
      expect(bimap.get("B")).toBe(undefined);
      expect(bimap.get("C")).toBe(20);

      bimap.set("A", 1);
      expect(bimap.getByValue(10)).toBe(undefined);
      expect(bimap.getByValue(1)).toBe("A");
    });
  });

  describe("has", () => {
    it("returns true if the bimap contains the given key, otherwise returns false", () => {
      const bimap = new Bimap<string, number>([
        ["A", 1],
      ]);

      expect(bimap.has("A")).toBe(true);
      expect(bimap.has("B")).toBe(false);
    });
  });

  describe("hasValue", () => {
    it("returns true if the bimap contains the given value, otherwise returns false", () => {
      const bimap = new Bimap<string, number>([
        ["A", 1],
      ]);

      expect(bimap.hasValue(1)).toBe(true);
      expect(bimap.hasValue(2)).toBe(false);
    });
  });

  describe("entries", () => {
    it("returns an iterable iterator with the [key, value] pairs for each element in the bimap", () => {
      const bimap = new Bimap<string, number>([
        ["A", 1],
        ["B", 2],
      ]);

      const entries = bimap.entries();

      expect(entries[Symbol.iterator]).not.toBe(undefined);
      expect(entries.next().value).toEqual(["A", 1]);
      expect(entries.next().value).toEqual(["B", 2]);
      expect(entries.next().value).toBe(undefined);
    });
  });

  describe("keys", () => {
    it("returns an iterable iterator with all keys in the bimap", () => {
      const bimap = new Bimap<string, number>([
        ["A", 1],
        ["B", 2],
      ]);

      const keys = bimap.keys();

      expect(keys[Symbol.iterator]).not.toBe(undefined);
      expect(keys.next().value).toBe("A");
      expect(keys.next().value).toBe("B");
      expect(keys.next().value).toBe(undefined);
    });
  });

  describe("values", () => {
    it("returns an iterable iterator with all values in the bimap", () => {
      const bimap = new Bimap<string, number>([
        ["A", 1],
        ["B", 2],
      ]);

      const values = bimap.values();

      expect(values[Symbol.iterator]).not.toBe(undefined);
      expect(values.next().value).toBe(1);
      expect(values.next().value).toBe(2);
      expect(values.next().value).toBe(undefined);
    });
  });

  describe("clear", () => {
    it("deletes all entries in the bimap", () => {
      const bimap = new Bimap<string, number>([
        ["A", 1],
        ["B", 2],
      ]);

      bimap.clear();
      expect(bimap.size).toBe(0);
      expect(bimap.get("A")).toBe(undefined);
      expect(bimap.get("B")).toBe(undefined);
      expect(bimap.getByValue(1)).toBe(undefined);
      expect(bimap.getByValue(2)).toBe(undefined);
    });
  });

  describe("delete", () => {
    it("removes an entry identified by the given key", () => {
      const bimap = new Bimap<string, number>([
        ["A", 1],
        ["B", 2],
      ]);

      bimap.delete("B");
      expect(bimap.get("B")).toBe(undefined);
      expect(bimap.getByValue(2)).toBe(undefined);
    });

    it("returns true if the deletion was successful, otherwise returns false", () => {
      const bimap = new Bimap<string, number>([
        ["A", 1],
        ["B", 2],
      ]);

      expect(bimap.delete("A")).toBe(true);
      expect(bimap.delete("A")).toBe(false);
      expect(bimap.delete("C")).toBe(false);
    });
  });

  describe("deleteByValue", () => {
    it("removes an entry identified by the given value", () => {
      const bimap = new Bimap<string, number>([
        ["A", 1],
        ["B", 2],
      ]);

      bimap.deleteByValue(2);
      expect(bimap.get("B")).toBe(undefined);
      expect(bimap.getByValue(2)).toBe(undefined);
    });

    it("returns true if the deletion was successful, otherwise returns false", () => {
      const bimap = new Bimap<string, number>([
        ["A", 1],
        ["B", 2],
      ]);

      expect(bimap.deleteByValue(1)).toBe(true);
      expect(bimap.deleteByValue(1)).toBe(false);
      expect(bimap.deleteByValue(3)).toBe(false);
    });
  });

  describe("forEach", () => {
    it("executes the given function for each entry in the bimap", () => {
      const callback = jest.fn();
      const bimap = new Bimap<string, number>([
        ["A", 1],
        ["B", 2],
      ]);

      bimap.forEach(callback);
      expect(callback).toBeCalledTimes(2);
    });

    it("passes valid arguments to the callback", () => {
      const callback = jest.fn();
      const bimap = new Bimap<string, number>([
        ["A", 1],
        ["B", 2],
      ]);

      bimap.forEach(callback);

      expect(callback.mock.calls[0]).toEqual([1, "A", bimap]);
      expect(callback.mock.calls[1]).toEqual([2, "B", bimap]);
    });

    it("binds the callback to the given this value if specified", () => {
      const callback = jest.fn();
      const thisValue = {};

      const bimap = new Bimap<string, number>([
        ["A", 1],
        ["B", 2],
      ]);

      bimap.forEach(callback, thisValue);
      expect(callback.mock.instances[0]).toBe(thisValue);
    });
  });
});
