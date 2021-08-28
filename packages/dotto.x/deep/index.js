import { target } from '../computed'
import { readable } from '../computed/readable'
import { onChange, onOff } from '../lifecycle'
import { run_all } from '../utils/run_all'

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
          return cb()
        },
        run() {
          let targetContainer = target()
          if (!targetContainer) return cb()
          targetContainer.replace((listeners, offHandlers, parent) => {
            let listenerBox = listeners.get(store)
            if (listenerBox && listenerBox['***']) return
            if (listenerBox) run_all(Object.values(listenerBox))
            listeners.set(store, { '***': onChange(store, parent.emit) })
            offHandlers.set(store, onOff(store, parent.invalidate))
          })
          return cb()
        }
      }
    }
  )
