export const toArrayKeys = path =>
  Array.isArray(path) ? path : path.split('.').filter(key => key)

export const concat = (left, right) =>
  Array.isArray(right) ? [left].concat(right) : `${left}.${right}`

export const walkPath = (path, cb) =>
  toArrayKeys(path).reduce((acc, part) => {
    const n = acc ? `${acc}.${part}` : part
    cb(n)
    return n
  }, '')
