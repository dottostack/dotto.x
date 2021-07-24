export const enhance = (store, enhancer) => {
  const commit = store.emit
  const handler = ({ storeName, path, ...rest }) => {
    enhancer({
      commit,
      storeName,
      store,
      path,
      value: store.get(path),
      ...rest
    })
  }
  store.emit = handler
  return () => (store.emit = commit)
}
