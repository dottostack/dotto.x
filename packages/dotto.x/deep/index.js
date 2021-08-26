import { readable } from '../computed/readable'
import { onChange, onOff } from '../lifecycle'

export const deep = store =>
  readable(
    () => store.get(),
    (cb, emit, invalidate) => {
      let unChange = onChange(store, emit)
      let unOff = onOff(store, () => invalidate(true))
      return {
        unbind() {
          unChange()
          unOff()
        },
        call() {
          return cb()
        }
      }
    }
  )
