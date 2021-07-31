import { jest } from '@jest/globals'

import { mount } from './index'
import { createStore } from '../../create-store'
import { computed } from '../computed'

jest.useFakeTimers()

describe('mount-operator:', () => {
  it('by listen', () => {
    expect.assertions(1)

    const store = createStore({ some: { path: 0 } })

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

    const store = createStore({ some: { path: 0 } })

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

  it('lazy initilization', () => {
    expect.assertions(1)

    const store = createStore<{ some: { path: number } }>()

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

  it('re-creation', () => {
    expect.assertions(1)

    const store = createStore<{ some: { path: number } }>()

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

    store.listen('some.path', (path, value) => {
      events.push(value)
    })
    store.set('some.path', 222)
    expect(events).toEqual(['mount', 1, 2, 'unmount', 'mount', 222])
  })

  it.skip('use computed', () => {
    expect.assertions(1)

    const store = createStore<{ some: { path?: number } }>()

    const events: (string | number | null)[] = []

    mount(store, () => {
      events.push('mount')
      return () => {
        events.push('unmount')
      }
    })

    const square = computed([store], () => {
      const num = store.get('some.path')
      return num === undefined ? null : num * 2
    })

    square.listen(val => {
      events.push(val)
    })

    store.set('some.path', 1)
    store.set('some.path', 2)

    store.off()

    store.set('some.path', 111)
    square.listen(val => {
      events.push(val)
    })
    // handle store off
    store.set('some.path', 4)
    // console.log(events)
    expect(events).toEqual(['mount', 1, 4, 'unmount'])
  })
})
