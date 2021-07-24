import { jest } from '@jest/globals'

import { DotXStore, createStore } from '../create-store'
import { enhance } from './enhance'
import { use } from './use'

jest.useFakeTimers()

function enhancer<Data>(store: DotXStore<Data>): () => void {
  return enhance(store, ({ commit, storeName, path, ...rest }) => {
    expect(path).toBe('some.path')
    commit({ storeName, path, ...rest })
  })
}

describe('use:', () => {
  it('base usage', () => {
    expect.assertions(2)
    const testingStore = createStore('test', { some: { path: 0 } })

    const unuse = use(testingStore, enhancer, enhancer)

    const unbind = testingStore.listen('some.path', () => {
      unuse()
    })

    testingStore.set('some.path', 1)
    testingStore.set('some.path', 2)

    unbind()
  })
})
