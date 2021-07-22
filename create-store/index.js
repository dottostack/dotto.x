import { get } from '../utils/get'
import { set } from '../utils/set'
import { concat, walk } from '../utils/path'

const HANDLERS = '__quarkx'
const DATA = 'data'

const emitChildren = (obj = {}, cb) => {
  for (const [path, child] of Object.entries(obj)) {
    if (path === HANDLERS) continue
    cb(get(obj, concat(path, HANDLERS)), path)
    emitChildren(child, cb)
  }
}

export const createStore = (name = 'quarkX', initial = {}) => {
  const listenners = {}
  const state = { data: initial }
  return {
    set(path, value) {
      set(state, concat(DATA, path), value)
      this.emit({ storeName: name, path })
    },
    get(path) {
      return get(state, concat(DATA, path))
    },
    emit({ storeName, path, ...rest }) {
      const fullPath = concat(DATA, path)
      const acc = {
        storeName,
        ...rest
      }
      walk(fullPath, part => {
        for (let listener of get(listenners, concat(part, HANDLERS)) || []) {
          listener(part.replace(`${DATA}.`, ''), get(state, part), acc)
        }
      })
      emitChildren(get(listenners, fullPath), handlers => {
        for (let listener of handlers || []) {
          listener(fullPath.replace(`${DATA}.`, ''), get(state, fullPath), acc)
        }
      })
    },
    listen(path = '', cb) {
      const dest = concat(DATA, concat(path, HANDLERS))
      let ns = get(listenners, dest) || set(listenners, dest, [])
      ns.push(cb)
      return () => {
        ns.splice(ns.indexOf(cb), 1)
      }
    },
    off() {
      set(listenners, DATA, undefined)
    }
  }
}
