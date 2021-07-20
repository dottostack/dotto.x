export const listenMany = (store, queries, cb) => {
  const unique = [...new Set(queries)]
  const unbinds = unique.map(query => store.listen(query, cb))
  return () => unbinds.forEach(unbind => unbind())
}
