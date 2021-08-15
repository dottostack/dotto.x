import { run_all } from '../utils/run_all'
import { on } from '../plugin-adapter'
import { context } from './context'

const get_or_create = (dest, key, payload) => {
  if (!dest.has(key)) dest.set(key, payload)
  return dest.get(key)
}

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
      let listenerBox = get_or_create(listeners, store, {})
      if (!storeOffHandlers.has(store)) {
        let unbind = on(store, {
          off() {
            let unbinds = listeners.get(store)
            if (!unbinds) return unbind()
            run_all(Object.values(unbinds))
            listeners.delete(store)
            invalidate(listeners.size === 0)
            unbind()
          }
        })
        storeOffHandlers.set(store, unbind)
      }
      if (!listenerBox[query]) listenerBox[query] = store.listen(query, emit)
    },
    call() {
      context.push(this)
      let res = cb()
      context.pop()
      return res
    }
    // add deps
  }
}
