import { use } from '../use-middleware'

const actionWrap = (store, actionName, cb) => {
  const unbind = use([store], ({ commit, storeName, path }) => {
    commit({ storeName, path, actionName })
  })
  const res = cb()
  unbind()
  return res
}

export const action = (store, actions) =>
  Object.entries(actions).reduce((acc, [actionName, cb]) => {
    acc[actionName] = actionWrap.bind(null, store, actionName, cb)
    return acc
  }, {})
