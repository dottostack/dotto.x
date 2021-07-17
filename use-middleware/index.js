export const use = ([...stores], middleware) => {
  const originals = stores.map(({ emit }) => emit)
  stores.forEach(store => {
    const commit = store.emit
    const handler = (storeName, path) => {
      middleware({ commit, storeName, store, path, value: store.get(path) })
    }
    store.emit = handler
  })
  return () => stores.map((store, index) => (store.emit = originals[index]))
}
