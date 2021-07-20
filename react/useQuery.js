import { useEffect, useState } from 'react'
import { unstable_batchedUpdates } from 'react-dom'

import { listenMany } from '../utils/listen-many'

export const useQuery = (store, queries) => {
  const [, force] = useState({})
  useEffect(() => {
    const unsub = listenMany(store, Object.values(queries), () => {
      if (unstable_batchedUpdates) {
        unstable_batchedUpdates(() => {
          force({})
        })
      } else {
        force({})
      }
    })
    return unsub
  }, [queries, store])
  return Object.entries(queries).reduce((acc, [queryKey, queryParam]) => {
    acc[queryKey] = store.get(queryParam)
    return acc
  }, {})
}
