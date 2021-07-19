import { get } from '../utils/get'
import { set } from '../utils/set'
import { concat, walk } from '../utils/path'

const HANDLERS = '__quarkx'

const emitChildren = (obj = {}, cb) => {
  for (const [path, child] of Object.entries(obj)) {
    if (path === HANDLERS) continue
    cb(get(obj, concat(path, HANDLERS)), path)
    emitChildren(child, cb)
  }
}

export const createStore = (name, initial = {}) => {
  const listenners = {}
  const state = { [name]: initial }
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
      const dest = concat(name, concat(path, HANDLERS))
      let ns = get(listenners, dest) || set(listenners, dest, [])
      ns.push(cb)
      return () => {
        ns.splice(ns.indexOf(cb), 1)
      }
    },
    off() {
      set(listenners, name, undefined)
    }
  }
}
