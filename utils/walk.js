import { toChain } from '../utils/path'

const handlers = new Map()
handlers.set(Array.prototype, (payload, key) => payload[key])
handlers.set(Object.prototype, (payload, key) => payload[key])
handlers.set(Map.prototype, (payload, key) => payload.get(key))

const handle = (payload, key, cb, isLast) => {
  let h = handlers.get(Object.getPrototypeOf(payload))
  cb && cb({ payload, key, isLast, value: h && h(payload, key) })
  return h && h(payload, key)
}

export const walk = (object, path, cb = null) => {
  const pathArray = toChain(path)
  return pathArray.reduce(
    (acc, key, i) => acc && handle(acc, key, cb, pathArray.length - 1 === i),
    object
  )
}
