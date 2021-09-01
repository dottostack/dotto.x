import { jest } from '@jest/globals'

import { createStore } from '../create-store'
import { onChange } from '../lifecycle'
import { action } from './index'

jest.useFakeTimers()

describe('action', () => {
  it('show action name', () => {
    let events: string[] = []
    let testingStore = createStore({ some: { path: 0 } })
    let unbind = onChange(testingStore, (_, { shared }) => {
      events.push(shared.actionName)
    })

    let setProp = action(testingStore, 'setProp', (num: number) =>
      testingStore.set('some.path', num)
    )

    setProp(1)
    setProp(2)
    setProp(3)
    unbind()
    expect(events).toEqual(['setProp', 'setProp', 'setProp'])
  })
})
