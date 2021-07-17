import { get } from '../utils/get'
import { set } from '../utils/set'
import { concat, walkPath } from '../utils/path'

const listenners = {}
const state = {}

const emit = (storeName, path) => {
  walkPath(concat(storeName, path), part => {
    const list = get(listenners, part)
    list &&
      list.forEach &&
      list.forEach(listener =>
        listener(part.replace(`${storeName}.`, ''), get(state, part))
      )
  })
}

export const createStore = (name, initialState = {}) => {
  set(state, name, initialState)
  const store = {
    set(path, value) {
      const op = set(state, concat(name, path), value)
      op === value && emit(name, path)
    },
    get(path) {
      return get(state, concat(name, path))
    },
    listen(path, cb) {
      if (typeof path !== 'string') cb = path
      let nsListeners = get(listenners, concat(name, path))
      if (!Array.isArray(nsListeners)) {
        nsListeners = set(listenners, concat(name, path), [])
      }
      nsListeners.push(cb)
      return () => {
        nsListeners.splice(nsListeners.indexOf(cb), 1)
      }
    },
    destroy() {
      set(listenners, name, undefined)
    }
  }
  return store
}
