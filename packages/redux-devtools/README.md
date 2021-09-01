<h1 align="center">dotto.redux-devtools</h1>
<br>
<div align="center"><img align="center" src="https://raw.githubusercontent.com/dottostack/dotto.x/main/packages/redux-devtools/logo.png" alt="dotto.redux-devtools is a plugin for usage dotto.x with redux-devtools"></div>
<br>

**dotto.redux-devtools** is a plugin for usage **dotto.x** with **redux-devtools**

<hr>
<br>
<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@dotto.x/redux-devtools">
    <img alt="" src="https://img.shields.io/npm/v/@dotto.x/redux-devtools.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="License" href="https://github.com/dottostack/dotto.x/blob/main/license.md">
    <img alt="" src="https://img.shields.io/npm/l/dotto.x.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="Twitter" href="https://twitter.com/eddartdort">
    <img alt="" src="https://img.shields.io/twitter/follow/eddartdort?labelColor=000000&color=1da1f2&label=Twitter&style=for-the-badge">
  </a>
</p>
<br>

# Install

**Using npm**

```sh
npm i @dotto.x/redux-devtools
```

**Using yarn**

```sh
yarn add @dotto.x/redux-devtools
```

# Connect your stores

### Single store

```js
import { createStore } from 'dotto.x'
import { reduxDevtools } from '@dotto.x/redux-devtools'

let someStore = createStore({ some: 'value' })

reduxDevtools({ someStore })
```

### Multiple stores

```js
import { createAtom, createStore } from 'dotto.x'
import { reduxDevtools } from '@dotto.x/redux-devtools'

let someStore = createStore({ some: 'value' })
let someAnotherStore = createStore({ some: 'value' })
let someAtomic = createAtom({ some: 'value' })
reduxDevtools({ someStore, someAnotherStore, someAtomic })
```
