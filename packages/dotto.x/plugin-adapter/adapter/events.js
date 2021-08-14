const create = (store, cb) => {
  let orig = store.listen.bind(store)
  store.listen = (...args) => {
    if (!store.lc) cb([...args])
    return orig(...args)
  }
}

const off = (store, cb) => {
  let orig = store.off.bind(store)
  store.off = (...args) => {
    cb([...args])
    return orig(...args)
  }
}

const set = (store, cb) => {
  let orig = store.set.bind(store)
  store.set = (...args) => {
    let isAborted
    let abort = () => (isAborted = true)

    cb([...args], { abort })
    if (isAborted) return
    return orig(...args)
  }
}

const change = (store, cb) => {
  let orig = store._emit.bind(store)
  store._emit = (...args) => {
    let isAborted
    let abort = () => (isAborted = true)

    cb([...args], { abort })
    if (isAborted) return
    return orig(...args)
  }
}

const get = (store, cb) => {
  let orig = store.get.bind(store)
  store.get = (...args) => {
    cb([...args])
    return orig(...args)
  }
}

export const events = { create, off, set, change, get }

export const keys = Object.keys(events)
