import { onOff, onChange } from '../lifecycle'
import { run_all } from '../utils/run_all'
import { DEEP_HANDLER } from './constants'
import { target } from './context'

const change = (store, cb) => {
  let unsubs = [store.listen(() => {}), onChange(store, cb)]
  return () => run_all(unsubs)
}

export const deep = (store, query) => {
  if (store._run) return store.get(true)
  let container = target()
  if (!container || container.silent) return store.get(query)
  let { listeners, destroys, invalidate, emit } = container
  let listenerBox = listeners.get(store)
  if (listenerBox && listenerBox[DEEP_HANDLER]) return store.get(query)
  if (listenerBox) {
    listenerBox[DEEP_HANDLER] = change(store, emit)
    let filtered = Object.entries(listenerBox).filter(
      ([key]) => key !== DEEP_HANDLER
    )
    // eslint-disable-next-line array-callback-return
    filtered.map(([key, cb]) => {
      cb()
      delete listenerBox[key]
    })
  } else {
    listeners.set(store, { [DEEP_HANDLER]: change(store, emit) })
  }

  destroys.set(
    store,
    onOff(store, () => invalidate(true))
  )
  return store.get(query)
}
