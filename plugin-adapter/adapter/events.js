const create = (store, cb) => {
  // console.log(cb)
}
const off = (store, cb) => {
  // console.log(cb)
}
const set = (store, cb) => {
  // console.log(cb)
}
const change = (store, cb) => {
  // console.log(cb)
}
const get = (store, cb, event) => {
  const def = store.get.bind(store)
  store.get = (...args) => {
    cb([...args], { event })
    return def(...args)
  }
}

export const events = { create, off, set, change, get }

export const keys = Object.keys(events)
