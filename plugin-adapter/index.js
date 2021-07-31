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
  return () => toUnbind.forEach(u => u())
}

export const on = (store, handlers) => {
  return api(store, listenerContainer =>
    Object.entries(handlers)
      .map(([key, handler]) => {
        const target = listenerContainer[key]
        if (!target) return false
        target.push(handler)
        return () => {
          target.splice(target.indexOf(handler), 1)
        }
      })
      .filter(v => v)
  )
}
