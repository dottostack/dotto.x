import { toChain } from '../utils/path'

const handle = (payload, key, cb, isLast) => {
  cb && cb({ payload, key, isLast, value: payload[key] })
  return payload[key]
}

export const walk = (object, path, cb = null) => {
  let pathArray = toChain(path)
  return pathArray.reduce(
    (acc, key, i) => acc && handle(acc, key, cb, pathArray.length - 1 === i),
    object
  )
}
