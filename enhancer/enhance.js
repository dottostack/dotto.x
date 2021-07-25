const handler =
  (cb, commit, store) =>
  ({ storeName, path, ...rest }) => {
    cb({
      commit,
      storeName,
      store,
      path,
      ...rest
    })
  }
const def = ({ commit, ...rest }) => {
  return commit({ ...rest })
}
export const enhance = (store, after = def, before = def) => {
  const emit = store._emit.bind(store)
  const set = store._set.bind(store)

  store._emit = handler(after, emit, store)
  store._set = handler(before, set, store)
  return () => {
    store._emit = emit
    store._set = set
  }
}
