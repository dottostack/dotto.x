import { jest } from '@jest/globals'

import { createStore } from '../create-store'
import { use } from './index'

jest.useFakeTimers()

describe('use-enhancer:', () => {
  it('base usage', () => {
    expect.assertions(1)
    const testingStore = createStore('test', { some: { path: 0 } })
    const unuse = use(
      [testingStore],
      ({ commit, storeName, path, ...rest }) => {
        expect(path).toBe('some.path')
        commit({ storeName, path, ...rest })
      }
    )
    const unbind = testingStore.listen('some.path', () => {
      unuse()
    })

    testingStore.set('some.path', 1)
    testingStore.set('some.path', 2)

    unbind()
  })

  it('pass data down', () => {
    expect.assertions(3)
    const testingStore = createStore('test', { some: { path: 0 } })
    const testingStore2 = createStore('test', { some: { lol: 0 } })
    const testingStore3 = createStore('test', { some: { aa: 0 } })

    use(
      [testingStore, testingStore2, testingStore3],
      ({ commit, storeName, path, someData, ...rest }) => {
        expect(path).toBe('some.path')
        expect(someData).toBe('imhere')
        commit({ storeName, path, ...rest })
      }
    )

    use([testingStore], ({ commit, storeName, path, ...rest }) => {
      expect(path).toBe('some.path')
      commit({ storeName, path, someData: 'imhere', ...rest })
    })

    testingStore.set('some.path', 1)
  })

  it('data from enhancer to listener', () => {
    expect.assertions(1)
    const testingStore = createStore('test', { some: { path: 0 } })
    const unuse = use(
      [testingStore],
      ({ commit, storeName, path, ...rest }) => {
        commit({ storeName, path, dataToListener: 1, ...rest })
      }
    )
    const unbind = testingStore.listen(
      'some.path',
      (path, value, { dataToListener }) => {
        expect(dataToListener).toBe(1)
      }
    )

    testingStore.set('some.path', 1)

    unbind()
    unuse()
  })
})
