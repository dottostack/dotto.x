import { events } from './events'

const createAdapter = (store, cb) => {
  return Object.entries(events).reduce((acc, [name, creator]) => {
    acc[name] = creator(store, cb.bind(null, name))
    return acc
  }, {})
}

export const adapter = (storage, store, cb, eventUtil) => {
  if (storage.has(store)) return storage.get(store)
  storage.set(store, createAdapter(store, cb, eventUtil))
  return storage.get(store)
}
