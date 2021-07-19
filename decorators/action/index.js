import { use } from '../../use-middleware'

// const setName = action(store, 'setName', (name) => set('user.name'))
// setName('John')

export const action = (store, actionName, cb) => {
  return (...params) => {
    const unbind = use([store], ({ commit, storeName, path }) => {
      commit({ storeName, path, actionName })
    })
    const res = cb(...params)
    unbind()
    return res
  }
}

export const actions = (store, methods) =>
  Object.entries(methods).reduce((acc, [actionName, cb]) => {
    acc[actionName] = action(store, actionName, cb)
    return acc
  }, {})
