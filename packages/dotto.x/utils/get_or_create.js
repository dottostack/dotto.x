export const get_or_create = (dest, key, getPayload) => {
  if (!dest.has(key)) dest.set(key, getPayload())
  return dest.get(key)
}
