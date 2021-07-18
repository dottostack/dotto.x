import { get } from '../utils/get'
import { set } from '../utils/set'
import { concat, walk } from '../utils/path'

const listenners = {}
const state = {}
const HANDLERS = '__quarkx'

const emitChildren = (obj = {}, cb) => {
  for (const [path, child] of Object.entries(obj)) {
    if (path === HANDLERS) continue
    cb(get(obj, concat(path, HANDLERS)), path)
    emitChildren(child, cb)
  }
}

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
      const fullPath = concat(storeName, path)
      walk(fullPath, part => {
        for (let listener of get(listenners, concat(part, HANDLERS)) || []) {
          listener(part.replace(`${storeName}.`, ''), get(state, part))
        }
      })
      emitChildren(get(listenners, fullPath), handlers => {
        for (let listener of handlers || []) {
          listener(fullPath.replace(`${storeName}.`, ''), get(state, fullPath))
        }
      })
    },
    listen(path, cb) {
      if (typeof path !== 'string') cb = path
      const dest = concat(name, concat(path, HANDLERS))
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
