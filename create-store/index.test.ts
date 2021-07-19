import { jest } from '@jest/globals'

import { createStore } from './index'

jest.useFakeTimers()

describe('create-store:', () => {
  it('strict listen', async () => {
    expect.assertions(2)
    const store = createStore('test')
    const unbind = store.listen('some.path', (path: string, value: any) => {
      expect(value).toBe(store.get(path))
    })

    store.set('some.path', 1)
    store.set('some.path', 2)
    unbind()
  })

  it('parent listen', () => {
    expect.assertions(2)
    const store = createStore('test')
    const unbind = store.listen('some', (path: string, value: any) => {
      expect(value).toBe(store.get(path))
    })

    store.set('some.path', 1)
    store.set('some.path', 2)
    unbind()
  })

  it('change parent', () => {
    expect.assertions(2)
    const store = createStore('test')
    const unbind = store.listen('some.path', (path: string, value: any) => {
      expect(value).toBe(store.get(path))
    })

    store.set('some', { path: 1 })
    store.set('some', { path: 2 })
    unbind()
  })

  it('change parent deep', () => {
    expect.assertions(2)
    const store = createStore('test-deep')
    const unbind = store.listen('some.path', (path: string, value: any) => {
      expect(value).toBe(store.get())
    })

    store.set(null, { some: { path: 1 } })
    store.set(null, { some: { path: 2 } })
    unbind()
  })

  it('root listen', () => {
    expect.assertions(2)
    const store = createStore('test')
    let i = 1
    store.listen('', (path: string, value: any) => {
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
    const obj2 = { c: { b: 1 } }
    const store = createStore('test', obj)
    expect(store.get()).toEqual(obj)
    store.set(null, obj2)
    expect(store.get()).toEqual(obj2)
  })
})
