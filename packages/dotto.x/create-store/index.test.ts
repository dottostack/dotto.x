import { jest } from '@jest/globals'

import { createStore } from './index'

jest.useFakeTimers()

describe('create-store:', () => {
  it('strict listen', async () => {
    expect.assertions(2)
    let store = createStore({ some: { path: 0 } })
    let unbind = store.watch('some.path', (path, value) => {
      expect(value).toBe(store.get(path))
    })

    store.set('some.path', 1)
    store.set('some.path', 2)
    unbind()
  })

  it('parent listen', () => {
    expect.assertions(2)
    let store = createStore({ some: { path: 0 } })
    let unbind = store.watch('some', (path, value) => {
      expect(value).toBe(store.get(path))
    })

    store.set('some', { path: 1 })
    store.set('some', { path: 2 })
    unbind()
  })

  it('change parent', () => {
    expect.assertions(2)
    let store = createStore({ some: { path: 0 } })
    let unbind = store.watch('some.path', (path, value) => {
      expect(value).toBe(store.get(path))
    })

    store.set('some', { path: 1 })
    store.set('some', { path: 2 })
    unbind()
  })

  it('change parent deep', () => {
    expect.assertions(2)
    let store = createStore({ some: { path: 0 } })
    let unbind = store.watch('some.path', (path, value) => {
      expect(value).toBe(store.get())
    })

    store.set(null, { some: { path: 1 } })
    store.set(null, { some: { path: 2 } })
    unbind()
  })

  it('root listen', () => {
    expect.assertions(2)
    let store = createStore({ some: { path: 0 } })
    let i = 1
    store.listen(value => {
      expect(value).toEqual({ some: { path: i++ } })
    })

    store.set(null, { some: { path: 1 } })
    store.set(null, { some: { path: 2 } })
    store.off()
  })

  it('root subscribe', () => {
    expect.assertions(3)
    let store = createStore({ some: { path: 0 } })
    let i = 0
    store.subscribe(value => {
      expect(value).toEqual({ some: { path: i++ } })
    })

    store.set('', { some: { path: 1 } })
    store.set('', { some: { path: 2 } })
    store.off()
  })

  it('self get', () => {
    let obj = { a: { b: 1 } }
    let store = createStore(obj)
    expect(store.get()).toEqual(obj)
  })

  it('self set', () => {
    let obj = { a: { b: 1 } }
    let obj2 = { a: { b: 333 } }
    let store = createStore(obj)
    expect(store.get()).toEqual(obj)
    store.set(null, obj2)
    expect(store.get()).toEqual(obj2)
  })

  it('generict test', () => {
    let store = createStore<{ num: 1 }>()
    store.set('num', 1)
    expect(store.get('num')).toBe(1)
  })
})
