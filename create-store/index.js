import { get } from '../utils/get'
import { set } from '../utils/set'
import { concat } from '../utils/path'

const listenners = {}
const state = {}

const emit = (storeName, path) => {
  get(listenners, concat(storeName, path)).forEach(listener =>
    listener(path, get(state, concat(storeName, path)))
  )
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
      let l = get(listenners, concat(name, path))
      if (!Array.isArray(l)) {
        l = set(listenners, concat(name, path), [])
      }
      l.push(cb)
      return () => {}
    }
  }
  return store
}
