import { target } from './context'

export const take = (store, query) => {
  if (!store.set) return store.get(true)
  let container = target()
  if (container.silent) return store.get(query)
  container.add(store, query)
  return store.get(query)
}
