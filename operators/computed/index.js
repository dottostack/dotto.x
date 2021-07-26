import { concat } from '../../utils/path'

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

const createComputedContainer = (stores, cb, emit) => {
  let listeners = {}

  const call = () => {
    const unpatch = pathGet(stores, (store, index, path) => {
      const accPath = concat(`${index}`, path)
      if (listeners[accPath]) return store._get(path)
      listeners[accPath] = store.listen(path, emit)
      return store._get(path)
    })

    const result = cb()

    unpatch()

    return result
  }

  return {
    unbind() {
      Object.values(listeners).forEach(unsub => unsub())
      listeners = {}
    },
    call
  }
}

export const computed = (stores, cb) => {
  const subscribers = []
  let lastResult = EMPTY

  const emit = () => {
    lastResult = container.call()
    subscribers.forEach(subscriber => {
      subscriber(lastResult)
    })
  }

  const container = createComputedContainer(stores, cb, emit)

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

  return { subscribe }
}
