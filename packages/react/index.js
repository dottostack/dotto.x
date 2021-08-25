import { useState, useEffect } from 'react'
import { unstable_batchedUpdates } from 'react-dom'

export const useStore = (store, selector) => {
  let [, force] = useState({})
  useEffect(() => {
    let cb = () => unstable_batchedUpdates(() => force({}))
    return store._run ? store.listen(cb) : store.watch(selector, cb)
  }, [selector, store])
  return store.get(selector)
}
