import { computed, take } from '../computed'

export const bind = (store, path) => {
  let bindedStore = computed(() => take(store, path))
  bindedStore.set = value => store.set(path, value)
  return bindedStore
}
