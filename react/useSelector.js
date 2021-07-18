import { useState, useEffect } from 'react'

export const useSelector = (store, selector) => {
  const [, force] = useState({})
  useEffect(() => {
    const unsub = store.listen(selector, () => {
      force({})
    })
    return unsub
  }, [selector, store])
  return store.get(selector)
}
