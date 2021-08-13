import { run_all } from '../utils/run_all'
import { adapter } from './adapter'
import { listener } from './listener'

const aStorage = new Map()
const lStorage = new Map()

const api = (store, bind) => {
  const listenerContainer = listener(lStorage, store)

  let isStoped
  const stop = () => (isStoped = true)
  const event = { stop }

  adapter(
    aStorage,
    store,
    (key, originalData, apiMethods) => {
      listenerContainer[key] &&
        listenerContainer[key].reduceRight((shared, h) => {
          !isStoped && h(originalData, { event, methods: apiMethods, shared })
          return shared
        }, {})
      isStoped = false
    },
    event
  )

  const toUnbind = bind(listenerContainer)
  return () => run_all(toUnbind)
}

export const on = (store, handlers) => {
  return api(store, listenerContainer =>
    Object.entries(handlers).reduce((unsubs, [key, handler]) => {
      const target = listenerContainer[key]
      if (!target) return unsubs
      target.push(handler)
      unsubs.push(() => {
        const index = target.indexOf(handler)
        index > -1 && target.splice(index, 1)
      })
      return unsubs
    }, [])
  )
}

export const once = (store, handlers) => {
  const unsub = on(
    store,
    Object.entries(handlers).reduce(
      (acc, [key, fn]) => ({
        ...acc,
        [key]: (...args) => {
          const res = fn(...args)
          unsub()
          return res
        }
      }),
      {}
    )
  )
}
