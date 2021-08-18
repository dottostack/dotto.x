import { computed, take } from '../computed'

export const query = (store, queries) => {
  return computed(() => {
    return Object.entries(queries).reduce(
      (acc, [queryKey, queryParam]) => ({
        ...acc,
        [queryKey]: take(store, queryParam)
      }),
      {}
    )
  })
}
