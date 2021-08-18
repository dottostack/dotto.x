import { walk } from './walk'

export const set = (object, setKey, value) =>
  walk(object, setKey, ({ payload, key, isLast, value: localValue }) => {
    if (!isLast && localValue === undefined) payload[key] = {}
    if (isLast) payload[key] = value
  })
