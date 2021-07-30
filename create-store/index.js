import { get } from '../utils/get'
import { set } from '../utils/set'
import { concat, walk } from '../utils/path'

const HANDLERS = '__h'
const DATA = 'd'

const emitChildren = (obj = {}, cb) => {
  for (const [path, child] of Object.entries(obj)) {
    if (path === HANDLERS) continue
    cb(get(obj, concat(path, HANDLERS)), path)
    emitChildren(child, cb)
  }
}

export const createStore = (name = 'd', initial = {}) => {
  const listenners = {}
  const state = { d: initial }
  const store = {
    lc: 0,
    set(path, value) {
      this._set({ storeName: name, path, value })
    },
    _set({ storeName, value, path, ...rest }) {
      set(state, concat(DATA, path), value)
      this._emit({ storeName, path, ...rest })
    },
    get(path) {
      return get(state, concat(DATA, path))
    },
    _emit({ storeName, path, ...rest }) {
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
      this.lc++
      return () => {
        ns.splice(ns.indexOf(cb), 1)
        this.lc--
        if (this.lc === 0) this.off()
      }
    },
    off() {
      set(listenners, DATA, undefined)
      this.lc = 0
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    store._l = listenners
    store._s = state
  }

  return store
}
