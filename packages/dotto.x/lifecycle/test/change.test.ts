import { createStore } from '../../create-store'
import { onChange } from '../index'

describe('api plugin: events: set', () => {
  it('simple', () => {
    let store = createStore({ some: 'data' })
    let events: string[] = []

    let un = onChange(store, () => {
      events.push('hello')
    })

    store.set('some', 'anotherData')

    un()

    expect(events).toEqual(['hello'])
  })

  it('unsub works', () => {
    let store = createStore({ some: 'data' })
    let events: string[] = []
    let un = onChange(store, () => {
      events.push('hello')
    })

    store.set('some', 'anotherData')

    un()

    store.set('some', 'anotherData222')

    expect(events).toEqual(['hello'])
  })

  it('two listeners: order', () => {
    let store = createStore({ some: 'data' })
    let events: string[] = []

    let un = onChange(store, () => {
      events.push('Neo')
    })

    let un2 = onChange(store, () => {
      events.push('wake up')
    })

    store.set('some', 'someData')

    un()
    un2()

    expect(events).toEqual(['wake up', 'Neo'])
  })

  it('two listeners: unsub', () => {
    let store = createStore({ some: 'data' })
    let events: string[] = []

    let un = onChange(store, () => {
      events.push('Neo')
    })

    let un2 = onChange(store, () => {
      events.push('wake up')
    })

    store.set('some', 'someData')

    un()

    store.set('some', 'someData2')

    expect(events).toEqual(['wake up', 'Neo', 'wake up'])
    un2()
  })

  describe('api params', () => {
    it('original data', () => {
      let store = createStore({ myPath: 'data', anotherPath: 'anotherData' })
      let events: unknown[] = []

      let un = onChange(store, original => {
        events.push(original)
      })

      store.set('myPath', 'someData')
      store.set('anotherPath', 'anotherData')

      un()

      expect(events).toEqual([['myPath'], ['anotherPath']])
    })

    it('api event', () => {
      let store = createStore({ myPath: 'data' })
      let events: string[] = []
      let un = onChange(store, () => {
        events.push('some Data')
      })

      let un2 = onChange(store, (original, api) => {
        events.push('wake up, Neo')
        api.event.stop()
      })

      store.set('myPath', 'someData')

      un()
      un2()

      expect(events).toEqual(['wake up, Neo'])
    })

    it('api shared', () => {
      let store = createStore({ myPath: 'data' })
      let events: unknown[] = []

      let un = onChange(store, (original, api) => {
        events.push(api.shared)
      })

      let un2 = onChange(store, (original, api) => {
        api.shared.test = 1
      })

      store.set('myPath', 'someData')

      un()
      un2()

      expect(events).toEqual([{ test: 1 }])
    })

    it('api abort', () => {
      let store = createStore({ myPath: 'data' })
      let events: unknown[] = []

      let un = onChange(store, (original, api) => {
        api.methods.abort()
      })

      let unsub = store.listen('myPath', (path, value) => {
        events.push(value)
      })

      store.set('myPath', 'someData')

      un()
      unsub()
      expect(events).toEqual([])
    })

    it('api abort unsub', () => {
      let store = createStore({ myPath: 'data' })
      let events: unknown[] = []

      let un = onChange(store, (original, api) => {
        api.methods.abort()
      })
      let unsub = store.listen('myPath', (path, value) => {
        events.push(value)
      })

      store.set('myPath', 'someData')

      un()

      store.set('myPath', 'unsub')
      unsub()

      expect(events).toEqual(['unsub'])
    })
  })
})
