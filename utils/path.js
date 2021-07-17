export const toArrayKeys = path =>
  Array.isArray(path) ? path : path.split('.').filter(key => key)

export const concat = (left, right) =>
  // eslint-disable-next-line no-nested-ternary
  Array.isArray(right)
    ? [left].concat(right)
    : right
    ? `${left}.${right}`
    : left

export const walkPath = (path, cb) =>
  toArrayKeys(path).reduce((acc, part) => {
    const n = acc ? `${acc}.${part}` : part
    cb(n)
    return n
  }, '')
