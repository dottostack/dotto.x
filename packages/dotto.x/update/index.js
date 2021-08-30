const isAtom = store => !store.watch && !store._run
// const isStore = store => store.watch
const isBinded = store => store._run && store.set

export const update = (store, cb) => {
  if (isBinded(store) || isAtom(store)) return store.set(cb(store.get()))
  // if (isStore(store)) TODO
  return store.set('', cb(store.get()))
}
