import { onCreate, onOff } from '../lifecycle'
import { run_all } from '../utils/run_all'

export const mount = (store, cb) => {
  let unmount
  let unsubs = [
    onCreate(store, () => (unmount = cb())),
    onOff(store, () => {
      if (unmount) unmount()
      unmount = null
    })
  ]
  return () => run_all(unsubs)
}
