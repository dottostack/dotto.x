import { createStore } from '../../create-store'
import { on } from '../index'

describe('api plugin: events: get', () => {
  it('simple', () => {
    const store = createStore({ some: 'data' })
    const events: string[] = []
    const un = on(store, {
      get() {
        events.push('hello')
      }
    })

    store.get('some')

    un()

    expect(events).toEqual(['hello'])
  })

  it('unsub works', () => {
    const store = createStore({ some: 'data' })
    const events: string[] = []
    const un = on(store, {
      get() {
        events.push('hello')
      }
    })

    store.get('some')

    un()

    store.get('some')

    expect(events).toEqual(['hello'])
  })

  it('two listeners: order', () => {
    const store = createStore({ some: 'data' })
    const events: string[] = []

    const un = on(store, {
      get() {
        events.push('Neo')
      }
    })

    const un2 = on(store, {
      get() {
        events.push('wake up')
      }
    })

    store.get('some')

    un()
    un2()

    expect(events).toEqual(['wake up', 'Neo'])
  })

  it('two listeners: unsub', () => {
    const store = createStore({ some: 'data' })
    const events: string[] = []

    const un = on(store, {
      get() {
        events.push('Neo')
      }
    })

    const un2 = on(store, {
      get() {
        events.push('wake up')
      }
    })

    store.get('some')

    un()

    store.get('some')

    expect(events).toEqual(['wake up', 'Neo', 'wake up'])
    un2()
  })

  describe('api params', () => {
    it('original data', () => {
      const store = createStore({ myPath: 'data', anotherPath: 'anotherData' })
      const events: string[] = []

      const un = on(store, {
        get(original: any) {
          events.push(original)
        }
      })

      store.get('myPath')
      store.get('anotherPath')

      un()

      expect(events).toEqual([['myPath'], ['anotherPath']])
    })

    it('api event', () => {
      const store = createStore({ myPath: 'data' })
      const events: string[] = []

      const un = on(store, {
        get() {
          events.push('some Data')
        }
      })

      const un2 = on(store, {
        get(original: any, api: any) {
          events.push('wake up, Neo')
          api.event.stop()
        }
      })

      store.get('myPath')

      un()
      un2()

      expect(events).toEqual(['wake up, Neo'])
    })

    it('api shared', () => {
      const store = createStore({ myPath: 'data' })
      const events: string[] = []

      const un = on(store, {
        get(original: any, api: any) {
          events.push(api.shared)
        }
      })

      const un2 = on(store, {
        get(original: any, api: any) {
          api.shared.test = 1
        }
      })

      store.get('myPath')

      un()
      un2()

      expect(events).toEqual([{ test: 1 }])
    })
  })
})
