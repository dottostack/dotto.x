import { on } from '../../plugin-adapter'

export const mount = (store, cb) => {
  let unmount
  return on(store, {
    create() {
      unmount = cb()
    },
    off() {
      if (unmount) unmount()
      unmount = null
    }
  })
}
