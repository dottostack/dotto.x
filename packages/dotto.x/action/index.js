import { onChange } from '../lifecycle'

export const SILENT_ACTION = 'SILENT_ACTION'

export const action = (store, title, cb) => {
  return (...params) => {
    let unbind = onChange(store, (_, { shared }) => {
      shared.actionName = title
    })
    let res = cb(...params)
    unbind()
    return res
  }
}
