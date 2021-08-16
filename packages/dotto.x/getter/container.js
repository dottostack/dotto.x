import { run_all } from '../utils/run_all'
import { onOff } from '../lifecycle'
import { context } from './context'
import { decorate } from '../utils/decorate'
import { get_or_create } from '../utils/get_or_create'

export const createContainer = (cb, emit, invalidate) => {
  let listeners = new Map()
  let storeOffHandlers = new Map()

  return {
    unbind() {
      listeners.forEach(sub => run_all(Object.values(sub)))
      listeners.clear()
      storeOffHandlers.clear()
    },
    add(store, query) {
      let listenerBox = get_or_create(listeners, store, () => ({}))

      get_or_create(storeOffHandlers, store, () => {
        let unbind = onOff(store, () => {
          listeners.delete(store)
          invalidate(listeners.size === 0)
          unbind()
        })
      })

      if (!listenerBox[query]) listenerBox[query] = store.listen(query, emit)
    },
    call() {
      return decorate(cb, () => {
        context.push(this)
        return () => context.pop()
      })
    }
  }
}
