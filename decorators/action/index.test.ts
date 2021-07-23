import { jest } from '@jest/globals'

import { createStore } from '../../create-store'
import { action } from './index'
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

    const setProp = action(testingStore, 'setProp', (num: number): number =>
      testingStore.set('some.path', num)
    )

    setProp(1)
  })
})
