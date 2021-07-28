<h1 align="center">Dotto Store</h1>

<img align="right" src="logo.png" width="200px" alt="dotstorex - lightweight state manager">

A tiny state manager for **React**
and vanilla JS. (other frameworks in future)
point changes

- **Lightweight.** Less than 485 bytes (minified and gzipped). Zero dependencies.
- **Easy but strong.** Simple working principe without magic, but with all features from big state managers.
- **Deep observable and fast.** You can subscribe and follow pinpoint changes without thinking about multiple re-renders.
- **Strong plugin system.** With plugins, you can enhance your store. Logging, undoing changes, connecting **Redux-devtools**, and anything else.
- **Tree Shakable.** All project splited by small modules.
- **Very strong TypeScript support.**
<hr>
<br>
<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/dotstorex">
    <img alt="" src="https://img.shields.io/npm/v/dotstorex.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="License" href="https://github.com/dortstorex/dotstorex/blob/main/license.md">
    <img alt="" src="https://img.shields.io/npm/l/dotstorex.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="Twitter" href="https://twitter.com/eddartdort">
    <img alt="" src="https://img.shields.io/twitter/follow/eddartdort?labelColor=000000&color=1da1f2&label=Twitter&style=for-the-badge">
  </a>
</p>
<br>

## How it works

```ts
import { createStore } from 'dotstorex'

const store = createStore('test', { some: { path: 0 } })

store.listen('some.path', (path, value) => {
  // path - some.path
  // value - 1,2
})

store.set('some.path', 1)
store.set('some.path', 2)
store.set('some.path', 'error') // type checks throw error, because 'some.path' most be a number.
```
