import { jest } from '@jest/globals'

import { mount } from './index'
import { createStore } from '../../create-store'

jest.useFakeTimers()

describe('mount-operator:', () => {
  it('by listen', () => {
    expect.assertions(1)

    const store = createStore('test', { some: { path: 0 } })

    const events: (string | number)[] = []

    mount(store, () => {
      events.push('mount')
      return () => {
        events.push('unmount')
      }
    })

    const unbind = store.listen('some.path', (path, value) => {
      events.push(value)
    })

    store.set('some.path', 1)
    store.set('some.path', 2)

    unbind()

    store.set('some.path', 111)

    expect(events).toEqual(['mount', 1, 2, 'unmount'])
  })

  it('by manual off', () => {
    expect.assertions(1)

    const store = createStore('test', { some: { path: 0 } })

    const events: (string | number)[] = []

    mount(store, () => {
      events.push('mount')
      return () => {
        events.push('unmount')
      }
    })

    store.listen('some.path', (path, value) => {
      events.push(value)
    })

    store.set('some.path', 1)
    store.set('some.path', 2)

    store.off()

    store.set('some.path', 111)

    expect(events).toEqual(['mount', 1, 2, 'unmount'])
  })
})
