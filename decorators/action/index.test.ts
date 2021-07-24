import { jest } from '@jest/globals'

import { createStore } from '../../create-store'
import { action } from './index'
import { enhance } from '../../enhancer'

jest.useFakeTimers()

describe('action:', () => {
  it('show action name', () => {
    expect.assertions(1)
    const testingStore = createStore('test', { some: { path: 0 } })

    enhance(
      testingStore,
      ({ commit, storeName, path, actionName, ...rest }) => {
        expect(actionName).toBe('setProp')
        commit({ storeName, path, ...rest })
      }
    )

    const setProp = action(testingStore, 'setProp', (num: number): number =>
      testingStore.set('some.path', num)
    )

    setProp(1)
  })
})
