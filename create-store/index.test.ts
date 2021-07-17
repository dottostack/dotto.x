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
})
