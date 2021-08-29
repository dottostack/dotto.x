export const createAtom = (data = {}) => {
  let listenners = []
  let store = {
    lc: 0,
    set(value) {
      data = value
      store._emit()
      return data
    },
    get() {
      return data
    },
    _emit() {
      for (let listener of listenners) {
        listener(data)
      }
    },
    listen(cb) {
      store.lc = listenners.push(cb)
      return () => {
        listenners.splice(listenners.indexOf(cb), 1)
        store.lc--
        if (!store.lc) store.off()
      }
    },
    subscribe(cb) {
      let unbind = store.listen(cb)
      cb(data)
      return unbind
    },
    off() {
      listenners = []
      store.lc = 0
    }
  }
  return store
}
