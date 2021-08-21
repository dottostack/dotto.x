import { useState, useEffect } from 'react'
import { unstable_batchedUpdates } from 'react-dom'

export const useSelector = (store, selector) => {
  let [, force] = useState({})
  useEffect(() => {
    let unsub = store.listen(selector, () => {
      if (unstable_batchedUpdates) {
        unstable_batchedUpdates(() => {
          force({})
        })
      } else {
        force({})
      }
    })
    return unsub
  }, [selector, store])
  return store.get(selector)
}
