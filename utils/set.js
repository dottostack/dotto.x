import { walk } from './walk'

const handle = (payload, key, value) => {
  return (payload[key] = value)
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
