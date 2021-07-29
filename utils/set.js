import { walk } from './walk'

export const set = (object, key, value) => {
  return walk(
    object,
    key,
    ({ payload, key: localKey, isLast, value: localValue }) => {
      if (!isLast && localValue === undefined) payload[localKey] = {}
      if (isLast) payload[key] = value
    }
  )
}
