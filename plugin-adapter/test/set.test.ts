import { createStore } from '../../create-store'
import { on } from '../index'

describe('api plugin: events: set', () => {
  it('simple', () => {
    const store = createStore({ some: 'data' })
    const events: string[] = []
    const un = on(store, {
      set() {
        events.push('hello')
      }
    })

    store.set('some', 'anotherData')

    un()

    expect(events).toEqual(['hello'])
  })

  it('unsub works', () => {
    const store = createStore({ some: 'data' })
    const events: string[] = []
    const un = on(store, {
      set() {
        events.push('hello')
      }
    })

    store.set('some', 'anotherData')

    un()

    store.set('some', 'anotherData222')

    expect(events).toEqual(['hello'])
  })

  it('two listeners: order', () => {
    const store = createStore({ some: 'data' })
    const events: string[] = []

    const un = on(store, {
      set() {
        events.push('Neo')
      }
    })

    const un2 = on(store, {
      set() {
        events.push('wake up')
      }
    })

    store.set('some', 'someData')

    un()
    un2()

    expect(events).toEqual(['wake up', 'Neo'])
  })

  it('two listeners: unsub', () => {
    const store = createStore({ some: 'data' })
    const events: string[] = []

    const un = on(store, {
      set() {
        events.push('Neo')
      }
    })

    const un2 = on(store, {
      set() {
        events.push('wake up')
      }
    })

    store.set('some', 'someData')

    un()

    store.set('some', 'someData2')

    expect(events).toEqual(['wake up', 'Neo', 'wake up'])
    un2()
  })

  describe('api params', () => {
    it('original data', () => {
      const store = createStore({ myPath: 'data', anotherPath: 'anotherData' })
      const events: unknown[] = []

      const un = on(store, {
        set(original) {
          events.push(original)
        }
      })

      store.set('myPath', 'someData')
      store.set('anotherPath', 'anotherData')

      un()

      expect(events).toEqual([
        ['myPath', 'someData'],
        ['anotherPath', 'anotherData']
      ])
    })

    it('api event', () => {
      const store = createStore({ myPath: 'data' })
      const events: string[] = []

      const un = on(store, {
        set() {
          events.push('some Data')
        }
      })

      const un2 = on(store, {
        set(original, api) {
          events.push('wake up, Neo')
          api.event.stop()
        }
      })

      store.set('myPath', 'someData')

      un()
      un2()

      expect(events).toEqual(['wake up, Neo'])
    })

    it('api shared', () => {
      const store = createStore({ myPath: 'data' })
      const events: unknown[] = []

      const un = on(store, {
        set(original, api) {
          events.push(api.shared)
        }
      })

      const un2 = on(store, {
        set(original, api) {
          api.shared.test = 1
        }
      })

      store.set('myPath', 'someData')

      un()
      un2()

      expect(events).toEqual([{ test: 1 }])
    })

    it('api abort', () => {
      const store = createStore({ myPath: 'data' })

      const un = on(store, {
        set(original, api) {
          api.methods.abort()
        }
      })

      store.set('myPath', 'someData')

      un()

      expect(store.get()).toEqual({ myPath: 'data' })
    })

    it('api abort unsub', () => {
      const store = createStore({ myPath: 'data' })

      const un = on(store, {
        set(original, api) {
          api.methods.abort()
        }
      })

      store.set('myPath', 'someData')

      un()

      store.set('myPath', 'afterUnsub')
      expect(store.get()).toEqual({ myPath: 'afterUnsub' })
    })
  })
})
