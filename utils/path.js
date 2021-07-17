export const toStringKeys = path =>
  Array.isArray(path) ? path.join('.') : path

export const toArrayKeys = path =>
  Array.isArray(path) ? path : path.split('.').filter(key => key)

export const concat = (left, right) =>
  Array.isArray(right) ? [left].concat(right) : `${left}.${right}`
