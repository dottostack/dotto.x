import { get } from '../utils/get'
import { set } from '../utils/set'
import { concat, walk } from '../utils/path'

const listenners = {}
const state = {}

export const createStore = (name, initialState = {}) => {
  set(state, name, initialState)
  return {
    set(path, value) {
      set(state, concat(name, path), value)
      this.emit({ storeName: name, path })
    },
    get(path) {
      return get(state, concat(name, path))
    },
    emit({ storeName, path }) {
      walk(concat(storeName, path), part => {
        for (let listener of get(listenners, concat(part, 'handlers')) || []) {
          listener(part.replace(`${storeName}.`, ''), get(state, part))
        }
      })
    },
    listen(path, cb) {
      if (typeof path !== 'string') cb = path
      const dest = concat(name, concat(path, 'handlers'))
      let nsListeners = get(listenners, dest) || set(listenners, dest, [])
      nsListeners.push(cb)
      return () => {
        nsListeners.splice(nsListeners.indexOf(cb), 1)
      }
    },
    off() {
      set(listenners, name, undefined)
    }
  }
}
