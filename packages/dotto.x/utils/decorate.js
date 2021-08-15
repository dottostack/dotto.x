export const decorate = (cb, decorator) => {
  let out = decorator()
  let res = cb()
  out()
  return res
}
