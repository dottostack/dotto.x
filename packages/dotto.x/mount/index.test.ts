import { jest } from '@jest/globals'

import { mount } from './index'
import { createStore } from '../create-store'
import { computed } from '../getter'
import { take } from '../getter/take'

jest.useFakeTimers()

describe('mount-operator:', () => {
  it('by listen', () => {
    expect.assertions(1)

    let store = createStore({ some: { path: 0 } })

    let events: (string | number)[] = []

    mount(store, () => {
      events.push('mount')
      return () => {
        events.push('unmount')
      }
    })

    let unbind = store.listen('some.path', (path, value) => {
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

    let store = createStore({ some: { path: 0 } })

    let events: (string | number)[] = []

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

    let store = createStore<{ some: { path: number } }>()

    let events: (string | number)[] = []

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

    let store = createStore<{ some: { path: number } }>()

    let events: (string | number)[] = []

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

  it('re-creation: without destructor', () => {
    expect.assertions(1)

    let store = createStore<{ some: { path: number } }>()

    let events: (string | number)[] = []

    mount(store, () => {
      events.push('mount')
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
    expect(events).toEqual(['mount', 1, 2, 'mount', 222])
  })

  it('use computed', () => {
    expect.assertions(1)

    let store = createStore<{ some: { path?: number } }>()

    let events: (string | number | null)[] = []

    let un = mount(store, () => {
      events.push('mount')
      return () => {
        events.push('unmount')
      }
    })

    let square = computed(() => {
      let num = take(store, 'some.path')
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
    un()
    expect(events).toEqual(['mount', 2, 4, 'unmount', 'mount', 8])
  })

  it('use computed: without destructor', () => {
    expect.assertions(1)

    let store = createStore<{ some: { path?: number } }>()

    let events: (string | number | null)[] = []

    mount(store, () => {
      events.push('mount')
    })

    let square = computed(() => {
      let num = take(store, 'some.path')
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

    expect(events).toEqual(['mount', 2, 4, 'mount', 8])
  })
})
