import {
  getCurrentInstance,
  onBeforeUnmount,
  watch,
  isRef,
  unref,
  ref
} from 'vue'

export const useStore = (store, selector) => {
  if (!isRef(selector)) selector = ref(selector)

  let state = ref()
  let unsubscribe

  let updateState = () => {
    state.value = store.get(unref(selector))
  }

  if (store._run || !store.watch) {
    updateState()
    unsubscribe = store.listen(updateState)
  } else {
    watch(
      selector,
      () => {
        updateState()
        unsubscribe = store.watch(unref(selector), updateState)
      },
      { immediate: true }
    )
  }

  getCurrentInstance() && onBeforeUnmount(unsubscribe)

  return state
}
