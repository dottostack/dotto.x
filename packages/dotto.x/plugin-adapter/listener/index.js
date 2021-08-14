import { keys } from '../adapter/events'

const createListener = () =>
  keys.reduce((acc, event) => ({ ...acc, [event]: [] }), {})

export const listener = (storage, store) => {
  if (storage.has(store)) return storage.get(store)
  storage.set(store, createListener())
  return storage.get(store)
}
