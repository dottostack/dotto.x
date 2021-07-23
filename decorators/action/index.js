import { use } from '../../use-enhancer'

export const action = (store, actionName, cb) => {
  return (...params) => {
    const unbind = use([store], ({ commit, storeName, path, ...rest }) => {
      commit({ storeName, path, actionName, ...rest })
    })
    const res = cb(...params)
    unbind()
    return res
  }
}
