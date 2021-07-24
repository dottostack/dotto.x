import { enhance } from '../../enhancer'
import { get } from '../../utils/get'
import { set } from '../../utils/set'

// TODO: clone deep and rethink storeName logic
export const prevValueEnhancer = ([...stores]) => {
  const container = {}
  enhance(stores, ({ commit, storeName, store, path, ...rest }) => {
    let prev = get(container, storeName)
    let prevValue
    if (prev === undefined) {
      prev = set(container, storeName, JSON.parse(JSON.stringify(store.get())))
      prevValue = get(prev, path)
    } else {
      prevValue = get(prev, path)
      prev = set(container, storeName, JSON.parse(JSON.stringify(store.get())))
    }

    commit({ storeName, store, prevValue, path, ...rest })
  })
}
