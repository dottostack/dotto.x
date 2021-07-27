import { listenMany } from '../../utils/listen-many'

export const query = (store, queries) => {
  // TODO handle many callbacks
  const contract = {
    subscribe(cb) {
      return listenMany(store, Object.values(queries), () => {
        cb(
          Object.entries(queries).reduce((acc, [queryKey, queryParam]) => {
            acc[queryKey] = store.get(queryParam)
            return acc
          }, {})
        )
      })
    }
  }
  return contract
}
