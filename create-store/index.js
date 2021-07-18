import { get } from '../utils/get'
import { set } from '../utils/set'
import { concat, walk } from '../utils/path'

const listenners = {}
const state = {}

export const createStore = (name, initialState = {}) => {
  set(state, name, initialState)
  return {
    set(path, value) {
      const op = set(state, concat(name, path), value)
      op === value && this.emit({ storeName: name, path })
    },
    get(path) {
      return get(state, concat(name, path))
    },
    emit({ storeName, path }) {
      walk(concat(storeName, path), part => {
        const list = get(listenners, part)
        list &&
          list.forEach &&
          list.forEach(listener =>
            listener(part.replace(`${storeName}.`, ''), get(state, part))
          )
      })
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
    chain(path) {
      return cb => this.listen(path, cb)
    },
    off() {
      set(listenners, name, undefined)
    }
  }
}
