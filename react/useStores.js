import { useEffect } from 'react'

export const useStores = (...stores) => {
  useEffect(() => {
    return () => stores.map(s => s.off())
  }, [stores])
  return stores
}
