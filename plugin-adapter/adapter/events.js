const create = (store, cb) => {
  const orig = store.listen.bind(store)
  store.listen = (...args) => {
    if (store.lc === 0) cb([...args])
    return orig(...args)
  }
}

const off = (store, cb) => {
  const orig = store.off.bind(store)
  store.off = (...args) => {
    cb([...args])
    return orig(...args)
  }
}

const set = (store, cb) => {
  const orig = store.get.bind(store)
  store.set = (...args) => {
    let isAborted
    const abort = () => (isAborted = true)

    cb([...args], { abort })
    if (isAborted) return
    return orig(...args)
  }
}

const change = (store, cb) => {
  const orig = store.get.bind(store)
  store._emit = (...args) => {
    let isAborted
    const abort = () => (isAborted = true)

    cb([...args], { abort })
    if (isAborted) return
    return orig(...args)
  }
}

const get = (store, cb) => {
  const orig = store.get.bind(store)
  store.get = (...args) => {
    cb([...args])
    return orig(...args)
  }
}

export const events = { create, off, set, change, get }

export const keys = Object.keys(events)
