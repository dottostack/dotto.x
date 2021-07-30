export const mount = (store, cb) => {
  const listen = store.listen.bind(store)
  const off = store.off.bind(store)
  let unmount
  store.listen = (...args) => {
    if (store.lc === 0) unmount = cb()
    return listen(...args)
  }
  store.off = () => {
    if (unmount) unmount()
    unmount = null
    return off()
  }
}
