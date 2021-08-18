import { toChain } from '../utils/path'

export const walk = (object, path, cb = null) => {
  let pathArray = toChain(path)
  return pathArray.reduce(
    (payload, key, i) =>
      payload &&
      (cb &&
        cb({
          payload,
          key,
          isLast: pathArray.length - 1 === i,
          value: payload[key]
        }),
      payload[key]),
    object
  )
}
