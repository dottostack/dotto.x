import { computed, take } from '../computed'

export const bind = (store, path) => {
  let bindedStore = computed(() => take(store, path))
  bindedStore.set = store.set.bind(store, path)
  return bindedStore
}
