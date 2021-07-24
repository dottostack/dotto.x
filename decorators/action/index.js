import { enhance } from '../../enhancer'

export const action = (store, actionName, cb) => {
  return (...params) => {
    const unbind = enhance(store, ({ commit, storeName, path, ...rest }) => {
      commit({ storeName, path, actionName, ...rest })
    })
    const res = cb(...params)
    unbind()
    return res
  }
}
