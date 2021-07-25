import { jest } from '@jest/globals'

import { createStore } from '../create-store'
import { enhance } from './enhance'

jest.useFakeTimers()

describe('enhancer:', () => {
  // it('base usage', () => {
  //   expect.assertions(1)
  //   const testingStore = createStore('test', { some: { path: 0 } })
  //   const unuse = enhance(
  //     testingStore,
  //     ({ commit, storeName, path, ...rest }) => {
  //       expect(path).toBe('some.path')
  //       commit({ storeName, path, ...rest })
  //     }
  //   )
  //   const unbind = testingStore.listen('some.path', () => {
  //     unuse()
  //   })

  //   testingStore.set('some.path', 1)
  //   testingStore.set('some.path', 2)

  //   unbind()
  // })

  // it('pass pass store from enhancer', () => {
  //   expect.assertions(2)
  //   const testingStore = createStore('test', { some: { path: 0 } })

  //   enhance(testingStore, ({ commit, storeName, path, store, ...rest }) => {
  //     expect(path).toBe('some.path')
  //     expect(store.get('some.path')).toEqual(testingStore.get('some.path'))
  //     commit({ storeName, path, store, ...rest })
  //   })

  //   testingStore.set('some.path', 1)
  // })

  // it('pass data down', () => {
  //   expect.assertions(3)
  //   const testingStore = createStore('test', { some: { path: 0 } })

  //   enhance(
  //     testingStore,
  //     ({ commit, storeName, path, someData, store, ...rest }) => {
  //       expect(path).toBe('some.path')
  //       expect(someData).toBe('imhere')
  //       commit({ storeName, path, store, ...rest })
  //     }
  //   )

  //   enhance(testingStore, ({ commit, storeName, path, ...rest }) => {
  //     expect(path).toBe('some.path')
  //     commit({ storeName, path, someData: 'imhere', ...rest })
  //   })

  //   testingStore.set('some.path', 1)
  // })

  // it('data from enhancer to listener', () => {
  //   expect.assertions(1)
  //   const testingStore = createStore('test', { some: { path: 0 } })
  //   const unuse = enhance(
  //     testingStore,
  //     ({ commit, storeName, path, ...rest }) => {
  //       commit({ storeName, path, dataToListener: 1, ...rest })
  //     }
  //   )
  //   const unbind = testingStore.listen(
  //     'some.path',
  //     (path, value, { dataToListener }) => {
  //       expect(dataToListener).toBe(1)
  //     }
  //   )

  //   testingStore.set('some.path', 1)

  //   unbind()
  //   unuse()
  // })

  it('before', () => {
    expect.assertions(1)
    const testingStore = createStore('test', { some: { path: 0 } })
    const unuse = enhance(
      testingStore,
      ({ commit, storeName, path, ...rest }) => {
        commit({ storeName, path, dataToListener: 1, ...rest })
      },

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
