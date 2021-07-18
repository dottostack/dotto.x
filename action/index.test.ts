import { jest } from '@jest/globals'

import { createStore } from '../create-store'
import { action } from './index'
import { use } from '../use-middleware'

jest.useFakeTimers()

describe('action:', () => {
  it('show action name', () => {
    expect.assertions(1)
    const testingStore = createStore('test')

    use([testingStore], ({ commit, storeName, path, actionName }: any) => {
      expect(actionName).toBe('setProp')
      commit({ storeName, path })
    })

    const actions = action(testingStore, {
      setProp() {
        testingStore.set('some.path', 1)
      }
    }) as { setProp: any }
    actions.setProp()
  })
})
