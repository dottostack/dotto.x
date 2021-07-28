const EMPTY = Symbol.for('empty')

const pathGet = (stores, direct, cb) => {
  stores.forEach((store, index) => {
    if (direct && store._get) return
    const oldGet = store.get
    store.get = cb.bind(null, store, index)
    store._get = oldGet
  })
  return () =>
    stores.forEach(store => {
      if (direct && store._get) return
      store.get = store._get
      delete store._get
    })
}

const createComputedContainer = (dependecies, cb, emit) => {
  const listeners = new Map()

  const call = direct => {
    const unpatch = pathGet(dependecies, direct, (store, index, path) => {
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

  return {
    unbind() {
      Object.values(listeners).forEach(unsub => unsub())
      listeners.clear()
    },
    call
  }
}

export const computed = (dependecies, cb) => {
  const subscribers = []
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

  const container = createComputedContainer(depsWithNested, cb, emit)

  const subscribe = subscriber => {
    subscribers.push(subscriber)

    if (lastResult === EMPTY) {
      lastResult = container.call()
    }

    subscriber(lastResult)

    return () => {
      const index = subscribers.indexOf(subscriber)
      subscribers.splice(index, 1)
      container.unbind()
      lastResult = EMPTY
    }
  }

  return {
    dependecies: depsWithNested,
    subscribe,
    run() {
      return container.call(true)
    }
  }
}
