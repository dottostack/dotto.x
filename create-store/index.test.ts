import { jest } from '@jest/globals'

import { createStore } from './index'

jest.useFakeTimers()

describe('create-store:', () => {
  it('strict listen', async () => {
    const store = createStore('test')
    const unbind = store.listen('some.path', (path: string, value: any) => {
      expect(value).toBe(store.get(path))
    })

    store.set('some.path', 1)
    store.set('some.path', 2)
    unbind()
  })

  it('parent listen', () => {
    const store = createStore('test')
    const unbind = store.listen('some', (path: string, value: any) => {
      expect(value).toBe(store.get(path))
    })

    store.set('some.path', 1)
    store.set('some.path', 2)
    unbind()
  })

  it('root listen', () => {
    const store = createStore('test')
    store.listen((path: string, value: any) => {
      expect(value).toBe(store.get(path))
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
