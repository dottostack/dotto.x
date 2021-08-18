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
    let adapterDirector = (key, originalData, methods) => {
      listenerContainer[key].reduceRight((shared, h) => {
        if (!isStoped) h(originalData, { event, methods, shared })
        return shared
      }, {})
      isStoped = false
    }
    creator(store, adapterDirector.bind(null, eventKey))
    adapterContainer[eventKey] = 1
  }

  return bind(listenerContainer)
}

const on = (store, handler, key, eventHandler) =>
  lifecycle(store, key, eventHandler, listenerContainer => {
    if (!listenerContainer[key]) {
      listenerContainer[key] = []
    }
    listenerContainer[key].push(handler)
    return () => {
      let index = listenerContainer[key].indexOf(handler)
      listenerContainer[key].splice(index, 1)
    }
  })

export const onCreate = (destStore, cb) =>
  on(destStore, cb, 'create', (store, handler) => {
    let orig = store.listen.bind(store)
    store.listen = (...args) => {
      if (!store.lc) handler([...args])
      return orig(...args)
    }
  })

export const onOff = (destStore, cb) =>
  on(destStore, cb, 'off', (store, handler) => {
    let orig = store.off.bind(store)
    store.off = (...args) => {
      handler([...args])
      return orig(...args)
    }
  })

export const onSet = (destStore, cb) =>
  on(destStore, cb, 'set', (store, handler) => {
    let orig = store.set.bind(store)
    store.set = (...args) => {
      let isAborted
      let abort = () => (isAborted = true)

      handler([...args], { abort })
      if (!isAborted) return orig(...args)
    }
  })

export const onChange = (destStore, cb) =>
  on(destStore, cb, 'change', (store, handler) => {
    let orig = store._emit.bind(store)
    store._emit = (...args) => {
      let isAborted
      let abort = () => (isAborted = true)

      handler([...args], { abort })
      if (!isAborted) return orig(...args)
    }
  })

export const onGet = (destStore, cb) =>
  on(destStore, cb, 'get', (store, handler) => {
    let orig = store.get.bind(store)
    store.get = (...args) => {
      handler([...args])
      return orig(...args)
    }
  })
