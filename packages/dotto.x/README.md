<h1 align="center">dotto.x</h1>

<img align="right" src="https://raw.githubusercontent.com/dottostack/dotto.x/main/logo.png" width="200px" alt="dotto.x - lightweight state manager">

Dotto.x is a tiny state manager for **React**, **Svelte**,
and vanilla JS.

- **Lightweight.** Core is less than 135 bytes (minified and gzipped). Zero dependencies.
- **Easy but strong.** Simple working principle without magic but with all features from big state managers.
- **Deep observable.** You can subscribe and follow pinpoint changes without thinking about multiple re-renders and memoization.
- **Strong plugin system.** You can enhance your store with plugins. Logging, undoing changes, connecting **Redux-devtools**, and anything else.
- **Tree Shakable.** All library is split into small modules.
- **Strong TypeScript support.**
<hr>
<br>
<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/dotto.x">
    <img alt="" src="https://img.shields.io/npm/v/dotto.x.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="License" href="https://github.com/dottostack/dotto.x/blob/main/license.md">
    <img alt="" src="https://img.shields.io/npm/l/dotto.x.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="Twitter" href="https://twitter.com/eddartdort">
    <img alt="" src="https://img.shields.io/twitter/follow/eddartdort?labelColor=000000&color=1da1f2&label=Twitter&style=for-the-badge">
  </a>
</p>
<br>

# Status

:warning: :warning: :warning:

**Project is in progress now. Please wait for version 1.0.0.**

# TODOS

- [ ] Documentation
- [ ] JSDoc comments
- [ ] Vue, RN, Solid bindings
- [ ] Examples on all frameworks

# Installation

**Using npm**

```sh
npm i dotto.x
```

**Using yarn**

```sh
yarn add dotto.x
```

# Basic usage

## Atomic stores

```ts
import { createAtom } from 'dotto.x'

const userName = createAtom('John')

userName.listen(value => {
  // do something
})

userName.set('John Constantine')
```

## Mutable stores

```ts
import { createStore } from 'dotto.x'

const user = createStore({ name: 'John' })

user.watch('name', value => {
  // do something
})

userName.set('name', 'John Constantine')
```

# Computed

## Combine your stores

Subscribe to store or part of stores using `take`.

```ts
import { createStore, computed, take } from 'dotto.x'

const user = createStore({ name: 'John', id: 'some_id' })
const projects = createStore({
  some_id: { name: 'Portfolio' },
  some_other_id: { name: 'Awesome Project' }
})

const targetProject = computed(() => {
  let userId = take(user, 'id')
  return take(projects, userId)
})

targetProject.subscribe(value => /* do something */)

user.set('id', 'some_other_id')
```

## Computed operators

### `take`

- get value and subscribe to this paths

### `deep`

- get value and subscribe to all store

# Use with React

Install `dotto.x` binding to React:

**Using npm**

```sh
npm i @dotto.x/react
```

**Using yarn**

```sh
yarn add @dotto.x/react
```

**store.js**

```ts
import { createStore, computed, take, update } from 'dotto.x'

const user = createStore({ name: 'John', id: 'some_id' })
const projects = createStore({
  some_id: { name: 'Portfolio' },
  some_other_id: { name: 'Awesome Project' }
})

export const targetProject = computed(() => {
  let userId = take(user, 'id')
  return take(projects, userId)
})

export const changeUser = newUser => {
  return update(user, () => newUser)
}
```

**ProjectCard.jsx**

```jsx
import { useStore } from '@dotto.x/react'
import { targetProject } from './store'

export const ProjectCard = () => {
  const project = useStore(targetProject)
  return <div>{project.name}</div>
}
```
