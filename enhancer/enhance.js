const handler =
  (cb, commit, store) =>
  ({ ...rest }) => {
    cb({
      commit,
      store,
      ...rest
    })
  }

export const enhance = (store, { before, after }) => {
  const set = store._set.bind(store)
  const emit = store._emit.bind(store)

  if (before) store._set = handler(before, set, store)
  if (after) store._emit = handler(after, emit, store)
  return () => {
    if (before) store._set = set
    if (after) store._emit = emit
  }
}
