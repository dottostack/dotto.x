import { listenMany } from './listen-many'

export const query = (store, queries, cb) => {
  return listenMany(store, Object.values(queries), () => {
    cb(
      Object.entries(queries).reduce((acc, [queryKey, queryParam]) => {
        acc[queryKey] = store.get(queryParam)
        return acc
      }, {})
    )
  })
}
