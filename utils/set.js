import { walk } from './walk'

const handlers = new Map([
  [Array.prototype, (payload, key, value) => (payload[key] = value)],
  [Object.prototype, (payload, key, value) => (payload[key] = value)],
  [Map.prototype, (payload, key, value) => payload.set(key, value)]
])

const handle = (payload, key, value) => {
  let h = handlers.get(Object.getPrototypeOf(payload))
  return h && h(payload, key, value)
}

export const set = (object, key, value) => {
  return walk(
    object,
    key,
    ({ payload, key: localKey, isLast, value: localValue }) => {
      if (!isLast && localValue === undefined) payload[localKey] = {}
      if (isLast) handle(payload, localKey, value)
    }
  )
}
