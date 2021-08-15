import { target } from './context'

export const take = (store, query) => {
  if (store.take) return store.take()
  target().add(store, query)
  return store.get(query)
}
