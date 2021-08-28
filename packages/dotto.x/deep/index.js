import { target } from '../computed'
import { readable } from '../computed/readable'
import { onChange, onOff } from '../lifecycle'

export const deep = store =>
  readable(
    () => store.get(),
    (cb, emit, invalidate) => {
      let unChange
      let unOff
      return {
        unbind() {
          unChange()
          unOff()
        },
        call() {
          if (!unChange) unChange = onChange(store, emit)

          if (!unOff) unOff = onOff(store, () => invalidate(true))
          console.log('?22?')
          return cb()
        },
        run() {
          let targetContainer = target()
          targetContainer.replace(store, parentEmit =>
            onChange(store, parentEmit)
          )
          return cb()
        }
      }
    }
  )
