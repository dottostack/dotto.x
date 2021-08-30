import { run_all } from '../utils/run_all'
import { onOff } from '../lifecycle'
import { context } from './context'
import { decorate } from '../utils/decorate'
import { get_or_create } from '../utils/get_or_create'
import { DEEP_HANDLER } from './constants'

export const createContainer = (cb, emit, invalidate) => {
  let listeners = new Map()
  let destroys = new Map()

  return {
    listeners,
    destroys,
    emit,
    invalidate,
    unbind() {
      listeners.forEach(sub => {
        run_all([...Object.values(sub), sub[DEEP_HANDLER] || (() => {})])
      })
      listeners.clear()
      destroys.forEach(sub => run_all(Object.values(sub)))
      destroys.clear()
    },
    add(store, query) {
      let listenerBox = get_or_create(listeners, store, () => ({}))
      if (listenerBox[DEEP_HANDLER]) return
      // TODO
      get_or_create(destroys, store, () => {
        let unbind = onOff(store, () => {
          listeners.delete(store)
          invalidate(!listeners.size)
          unbind()
        })
        return unbind
      })

      if (!listenerBox[query]) {
        listenerBox[query] = store.watch
          ? store.watch(query, emit)
          : store.listen(emit)
      }
    },
    call() {
      return decorate(cb, () => {
        context.push(this)
        return () => context.pop()
      })
    }
  }
}
