import { target } from './context'

export const take = (store, query) => {
  if (store._run) return store.get(true)
  let container = target()
  return !container || container.silent
    ? store.get(query)
    : (container.add(store, query), store.get(query))
}
