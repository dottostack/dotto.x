export const toChain = path => path.split('.').filter(key => key)

export const concat = (left, right) => (right ? `${left}.${right}` : left)

export const walk = (path, cb) =>
  toChain(path).reduce((acc, part) => {
    let n = acc ? `${acc}.${part}` : part
    cb(n)
    return n
  }, '')
