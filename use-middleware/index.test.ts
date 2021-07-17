import { jest } from '@jest/globals'

import { createStore } from '../create-store'
import { use } from './index'

jest.useFakeTimers()

describe('use-middlewares:', () => {
  it('strict listen', () => {
    expect.assertions(1)
    const testingStore = createStore('test')
    const unuse = use([testingStore], ({ commit, storeName, path }: any) => {
      expect(path).toBe('some.path')
      commit(storeName, path)
    })
    const unbind = testingStore.listen('some.path', () => {
      unuse()
    })

    testingStore.set('some.path', 1)
    testingStore.set('some.path', 2)

    unbind()
  })
})
