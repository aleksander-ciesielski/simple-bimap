<div align="center">
  <h1>🗺️↔️ simple-bimap</h1>
  <a href="https://www.npmjs.com/package/simple-bimap">
    <img src="https://img.shields.io/npm/v/simple-bimap" alt="simple-bimap on npm">
  </a>
  <a href="https://github.com/aleksander-ciesielski/simple-bimap/issues">
    <img src="https://img.shields.io/github/issues/aleksander-ciesielski/simple-bimap" alt="GitHub issues">
  </a>
  <img src="https://img.shields.io/npm/l/simple-bimap" alt="Licensed using MIT license">
</div>
<br />

A tiny (~400 bytes gzipped) implementation of a [bidirectional map](https://en.wikipedia.org/wiki/Bidirectional_map) in JavaScript. It can be used interchangeably with the JavaScript `Map` as `Bimap` implements its whole interface while also providing new methods. Note that `Bimap` requires a bijective relation between the keys and values, unlike a normal map.

**Warning**: Although `Bimap` instances are assignable to the `Map` ones, `Bimap` does **NOT** inherit from the `Map`.
## Installation
Via `npm`:
```
$ npm i simple-bimap --save
```
\
Via `yarn`:
```
$ yarn add simple-bimap
```

## Usage

```js
import { Bimap } from "simple-bimap";
```

### API
Apart from all the properties from the `Map`, the `Bimap` offers three extra methods:

| Method                                                           | Description                                                                                                                                                                                                                                     |
|------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Bimap<K, V>.prototype.getByValue(value: V): K &#124; undefined` | Returns the key associated with the given value or `undefined` if it doesn't exist. |
| `Bimap<K, V>.prototype.hasValue(value: V): boolean`              | Returns `true` if the given value is in the bimap and `false` otherwise.                                                                                                                                                                        |
| `Bimap<K, V>.prototype.deleteByValue(value: V): boolean`         | Deletes a bimap entry that has a value equal to the one given as the argument. Returns `true` if the deletion was successful and `false` otherwise.                                                                                             |

The time complexities of each of these methods are equal to the complexities of their corresponding key-oriented counterparts (`get`/`has`/`delete`), so they should be sublinear.
