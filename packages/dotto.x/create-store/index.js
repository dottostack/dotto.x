import { get } from '../utils/get'
import { set } from '../utils/set'
import { concat, walk } from '../utils/path'

const HANDLERS = '__h'
const DATA = 'd'

const emitChildren = (obj = {}, cb) => {
  for (let [path, child] of Object.entries(obj)) {
    if (path === HANDLERS) continue
    cb(get(obj, concat(path, HANDLERS)), path)
    emitChildren(child, cb)
  }
}

export const createStore = (initial = {}) => {
  let listenners = {}
  let state = { d: initial }
  let store = {
    lc: 0,
    set(path, value) {
      let res = set(state, concat(DATA, path), value)
      store._emit(path)
      return res
    },
    get(path) {
      return get(state, concat(DATA, path))
    },
    _emit(path) {
      let fullPath = concat(DATA, path)
      walk(fullPath, part => {
        for (let listener of get(listenners, concat(part, HANDLERS)) || []) {
          listener(part.replace(`${DATA}.`, ''), get(state, part))
        }
      })
      emitChildren(get(listenners, fullPath), handlers => {
        for (let listener of handlers || []) {
          listener(fullPath.replace(`${DATA}.`, ''), get(state, fullPath))
        }
      })
    },
    watch(path, cb) {
      let dest = concat(DATA, concat(path, HANDLERS))
      let ns = get(listenners, dest) || set(listenners, dest, [])
      ns.push(cb)
      store.lc++
      return () => {
        ns.splice(ns.indexOf(cb), 1)
        store.lc--
        if (!store.lc) store.off()
      }
    },
    listen(cb) {
      return store.watch('', (_, value) => cb(value))
    },
    subscribe(cb) {
      let unbind = store.listen(cb)
      cb(state.d)
      return unbind
    },
    off() {
      set(listenners, DATA, undefined)
      store.lc = 0
    }
  }

  return store
}
