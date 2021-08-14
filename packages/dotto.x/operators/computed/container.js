import { once, on } from '../../plugin-adapter'
import { run_all } from '../../utils/run_all'

const withListeners = (dependecies, listeners, emit, cb) => {
  let unsubs = dependecies.map(store =>
    on(store, {
      get(path) {
        if (!listeners.has(store)) listeners.set(store, {})
        let target = listeners.get(store)
        if (target[path]) return
        target[path] = store.listen(path, emit)
      }
    })
  )
  let result = cb()
  run_all(unsubs)
  return result
}
// base deps
export const createContainer = (deps, cb, emit, invalidate) => {
  let listeners = new Map()
  // handle store destroys
  deps.forEach(store => {
    once(store, {
      off() {
        let unbinds = listeners.get(store)
        if (!unbinds) return
        run_all(Object.values(unbinds))
        listeners.delete(store)
        invalidate(listeners.size === 0)
      }
    })
  })
  return {
    unbind() {
      listeners.forEach(sub => run_all(Object.values(sub)))
      listeners.clear()
    },
    call() {
      return withListeners(deps, listeners, emit, cb)
    }
    // add deps
  }
}
