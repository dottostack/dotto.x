export const listenMany = (store, queries, cb) => {
  let unique = [...new Set(queries)]
  let unbinds = unique.map(query => store.listen(query, cb))
  return () => unbinds.forEach(unbind => unbind())
}
