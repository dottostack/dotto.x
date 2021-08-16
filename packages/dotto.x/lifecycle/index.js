import { get_or_create } from '../utils/get_or_create'

const adaptersStorage = new Map()
const listenersStorage = new Map()

const lifecycle = (store, eventKey, creator, bind) => {
  let listenerContainer = get_or_create(listenersStorage, store, () => ({}))

  let isStoped
  let stop = () => (isStoped = true)
  let event = { stop }

  let adapterContainer = get_or_create(adaptersStorage, store, () => ({}))

  if (!adapterContainer[eventKey]) {
    let adapterDirector = (key, originalData, apiMethods) => {
      listenerContainer[key] &&
        listenerContainer[key].reduceRight((shared, h) => {
          !isStoped && h(originalData, { event, methods: apiMethods, shared })
          return shared
        }, {})
      isStoped = false
    }
    creator(store, adapterDirector.bind(null, eventKey))
    adapterContainer[eventKey] = 1
  }

  let toUnbind = bind(listenerContainer)
  return toUnbind
}

const on = (store, handler, key, eventHandler) => {
  return lifecycle(store, key, eventHandler, listenerContainer => {
    if (!listenerContainer[key]) {
      listenerContainer[key] = []
    }
    listenerContainer[key].push(handler)
    return () => {
      let index = listenerContainer[key].indexOf(handler)
      listenerContainer[key].splice(index, 1)
    }
  })
}

export const onCreate = (destStore, cb) => {
  return on(destStore, cb, 'create', (store, handler) => {
    let orig = store.listen.bind(store)
    store.listen = (...args) => {
      if (!store.lc) handler([...args])
      return orig(...args)
    }
  })
}

export const onOff = (destStore, cb) => {
  return on(destStore, cb, 'off', (store, handler) => {
    let orig = store.off.bind(store)
    store.off = (...args) => {
      handler([...args])
      return orig(...args)
    }
  })
}

export const onSet = (destStore, cb) => {
  return on(destStore, cb, 'set', (store, handler) => {
    let orig = store.set.bind(store)
    store.set = (...args) => {
      let isAborted
      let abort = () => (isAborted = true)

      handler([...args], { abort })
      if (isAborted) return
      return orig(...args)
    }
  })
}

export const onChange = (destStore, cb) => {
  return on(destStore, cb, 'change', (store, handler) => {
    let orig = store._emit.bind(store)
    store._emit = (...args) => {
      let isAborted
      let abort = () => (isAborted = true)

      handler([...args], { abort })
      if (isAborted) return
      return orig(...args)
    }
  })
}

export const onGet = (destStore, cb) => {
  return on(destStore, cb, 'get', (store, handler) => {
    let orig = store.get.bind(store)
    store.get = (...args) => {
      handler([...args])
      return orig(...args)
    }
  })
}
