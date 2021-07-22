import { jest } from '@jest/globals'

import { createStore } from './index'

jest.useFakeTimers()

describe('create-store:', () => {
  it('strict listen', async () => {
    expect.assertions(2)
    const store = createStore('test', { some: { path: 0 } })
    const unbind = store.listen('some.path', (path, value) => {
      expect(value).toBe(store.get(path))
    })

    store.set('some.path', 1)
    store.set('some.path', 2)
    unbind()
  })

  it('parent listen', () => {
    expect.assertions(2)
    const store = createStore('test', { some: { path: 0 } })
    const unbind = store.listen('some', (path, value) => {
      expect(value).toBe(store.get(path))
    })

    store.set('some.path', 3)
    store.set('some.path', 2)
    unbind()
  })

  it('change parent', () => {
    expect.assertions(2)
    const store = createStore('test', { some: { path: 0 } })
    const unbind = store.listen('some.path', (path, value) => {
      expect(value).toBe(store.get(path))
    })

    store.set('some', { path: 1 })
    store.set('some', { path: 2 })
    unbind()
  })

  it('change parent deep', () => {
    expect.assertions(2)
    const store = createStore('test-deep', { some: { path: 0 } })
    const unbind = store.listen('some.path', (path, value) => {
      expect(value).toBe(store.get())
    })

    store.set(null, { some: { path: 1 } })
    store.set(null, { some: { path: 2 } })
    unbind()
  })

  it('root listen', () => {
    expect.assertions(2)
    const store = createStore('test', { some: { path: 0 } })
    let i = 1
    store.listen(undefined, (path, value) => {
      expect(value).toEqual({ some: { path: i++ } })
    })

    store.set('some.path', 1)
    store.set('some.path', 2)
    store.off()
  })

  it('self get', () => {
    const obj = { a: { b: 1 } }
    const store = createStore('test', obj)
    expect(store.get()).toEqual(obj)
  })

  it('self set', () => {
    const obj = { a: { b: 1 } }
    const obj2 = { a: { b: 333 } }
    const store = createStore('test', obj)
    expect(store.get()).toEqual(obj)
    store.set(null, obj2)
    expect(store.get()).toEqual(obj2)
  })
})
