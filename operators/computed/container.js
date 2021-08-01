import { on } from '../../plugin-adapter'
import { run_all } from '../../utils/run_all'

const withListeners = (dependecies, listeners, emit, cb) => {
  const unsubs = dependecies.map(store =>
    on(store, {
      get(path) {
        if (!listeners.has(store)) listeners.set(store, {})
        const target = listeners.get(store)
        if (target[path]) return
        target[path] = store.listen(path, emit)
      }
    })
  )
  const result = cb()
  run_all(unsubs)
  return result
}

export const createContainer = (deps, cb, emit, invalidate) => {
  const listeners = new Map()
  // handle store destroys
  deps.forEach(store => {
    const un = on(store, {
      off() {
        const unbinds = listeners.get(store)
        if (!unbinds) return un()
        run_all(Object.values(unbinds))
        listeners.delete(store)
        invalidate(listeners.size === 0)
        un()
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
  }
}
