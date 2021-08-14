import { computed } from '../computed'

export const query = (store, queries) => {
  return computed([store], () => {
    return Object.entries(queries).reduce(
      (acc, [queryKey, queryParam]) => ({
        ...acc,
        [queryKey]: store.get(queryParam)
      }),
      {}
    )
  })
}
