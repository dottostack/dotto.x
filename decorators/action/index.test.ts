import { jest } from '@jest/globals'

import { createStore } from '../../create-store'
import { actions } from './index'
import { use } from '../../use-enhancer'

jest.useFakeTimers()

describe('action:', () => {
  it('show action name', () => {
    expect.assertions(1)
    const testingStore = createStore('test', { some: { path: 0 } })

    use([testingStore], ({ commit, storeName, path, actionName }: any) => {
      expect(actionName).toBe('setProp')
      commit({ storeName, path })
    })

    const a = actions(testingStore, {
      setProp() {
        testingStore.set('some.path', 1)
      }
    }) as { setProp: any }
    a.setProp()
  })
})
