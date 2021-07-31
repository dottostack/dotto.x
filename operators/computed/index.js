import { on } from '../../plugin-adapter'

const EMPTY = Symbol.for('empty')

const pathGet = (stores, cb) => {
  stores.forEach((store, index) => {
    const oldGet = store.get
    store.get = cb.bind(null, store, index)
    store._get = oldGet
  })
  return () =>
    stores.forEach(store => {
      store.get = store._get
      delete store._get
    })
}

const insideHandlers = (dependecies, listeners, emit, cb) => {
  const unpatch = pathGet(dependecies, (store, index, path) => {
    if (!listeners.has(store)) listeners.set(store, {})
    const target = listeners.get(store)
    if (target[path]) return store._get(path)
    target[path] = store.listen(path, emit)

    return store._get(path)
  })

  const result = cb()

  unpatch()
  return result
}

const createComputedContainer = (dependecies, cb, emit, destroy) => {
  const listeners = new Map()
  dependecies.forEach(store => {
    const un = on(store, {
      off() {
        const unbinds = listeners.get(store)
        if (!unbinds) return un()
        Object.values(unbinds).forEach(unsub => unsub())
        listeners.delete(store)
        destroy(listeners.size === 0)
        un()
      }
    })
  })
  return {
    unbind() {
      listeners.forEach(sub => Object.values(sub).forEach(unsub => unsub()))
      listeners.clear()
    },
    call(direct) {
      if (direct) return cb()
      return insideHandlers(dependecies, listeners, emit, cb)
    }
  }
}

export const computed = (dependecies, cb) => {
  let subscribers = []
  let lastResult = EMPTY

  const emit = () => {
    lastResult = container.call()
    subscribers.forEach(subscriber => {
      subscriber(lastResult)
    })
  }

  const depsWithNested = [
    ...new Set(
      dependecies.reduce((acc, dep) => {
        if (dep.dependecies) return acc.concat(dep.dependecies)
        acc.push(dep)
        return acc
      }, [])
    )
  ]
  const destroy = isAll => {
    lastResult = EMPTY
    if (isAll) subscribers = []
  }
  const container = createComputedContainer(depsWithNested, cb, emit, destroy)

  return {
    dependecies: depsWithNested,
    _run(subscriber, fireImmediately) {
      subscribers.push(subscriber)

      if (lastResult === EMPTY) {
        lastResult = container.call()
      }

      if (fireImmediately) subscriber(lastResult)

      return () => {
        const index = subscribers.indexOf(subscriber)
        subscribers.splice(index, 1)
        if (!subscribers.length) {
          this.off()
        }
      }
    },
    subscribe(subscriber) {
      return this._run(subscriber, true)
    },
    listen(subscriber) {
      return this._run(subscriber, false)
    },
    get() {
      return container.call(true)
    },
    off() {
      container.unbind()
      lastResult = EMPTY
    }
  }
}
