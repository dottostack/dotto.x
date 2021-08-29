export const update = (store, cb) => {
  if (store._run && store.set) return store.set(cb(store.get()))
  if (store.set) return store.set('', cb(store.get()))
  // TODO warn
}
