import { onChange } from '../lifecycle'

export const watchDeep = (store, cb) =>
  onChange(store, ([changePath = '']) => cb(changePath, store.get(changePath)))
