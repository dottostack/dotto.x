let typesHandlers = new Map([
  [Array.prototype, (payload, key) => payload[key]],
  [Object.prototype, (payload, key) => payload[key]],
  [Map.prototype, (payload, key) => payload.get(key)]
])

let handle = (payload, key) => {
  let h = typesHandlers.get(Object.getPrototypeOf(payload))
  return h && h(payload, key)
}

export const get = (object, path) => {
  const pathArray = Array.isArray(path)
    ? path
    : path.split('.').filter(key => key)

  return pathArray.reduce((obj, key) => obj && handle(obj, key), object)
}
