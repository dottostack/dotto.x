# Work in progress

### Simple usage:

```js
const store = createStore('test')
const unbind = store.listen('some', (path, value) => {
  expect(value).toBe(store.get(path))
})
store.set('some.path', 1)
store.set('some.path.deep.path', 2)
```

### Middleware

```js
const testingStore = createStore('test')
const unuse = use([testingStore], ({ commit, storeName, path }) => {
  console.log(storeName, path)
  // you can log or do something and than commit for fire reaction
  commit(storeName, path)
})
```
