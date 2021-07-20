import { useQuery } from './useQuery'

export const useQueryProps = (store, props, queryIndicator = '$q.') => {
  const queries = Object.entries(props).reduce((acc, [propKey, prop]) => {
    if (typeof prop !== 'string') return acc
    if (!prop.startsWith(queryIndicator)) return acc
    acc[propKey] = prop.replace(queryIndicator, '')
    return acc
  }, {})

  return useQuery(store, queries)
}
