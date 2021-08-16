import { createStore } from '../../create-store'
import { onGet } from '../index'

describe('api plugin: events: set', () => {
  it('simple', () => {
    let store = createStore({ some: 'data' })
    let events: string[] = []
    let un = onGet(store, () => events.push('hello'))

    store.get('some')

    un()

    expect(events).toEqual(['hello'])
  })

  it('unsub works', () => {
    let store = createStore({ some: 'data' })
    let events: string[] = []
    let un = onGet(store, () => events.push('hello'))

    store.get('some')

    un()

    store.get('some')

    expect(events).toEqual(['hello'])
  })

  it('two listeners: order', () => {
    let store = createStore({ some: 'data' })
    let events: string[] = []

    let un = onGet(store, () => events.push('Neo'))

    let un2 = onGet(store, () => events.push('wake up'))

    store.get('some')

    un()
    un2()

    expect(events).toEqual(['wake up', 'Neo'])
  })

  it('two listeners: unsub', () => {
    let store = createStore({ some: 'data' })
    let events: string[] = []

    let un = onGet(store, () => events.push('Neo'))

    let un2 = onGet(store, () => events.push('wake up'))

    store.get('some')

    un()

    store.get('some')

    expect(events).toEqual(['wake up', 'Neo', 'wake up'])
    un2()
  })

  describe('api params', () => {
    it('original data', () => {
      let store = createStore({ myPath: 'data', anotherPath: 'anotherData' })
      let events: unknown[] = []

      let un = onGet(store, original => events.push(original))

      store.get('myPath')
      store.get('anotherPath')

      un()

      expect(events).toEqual([['myPath'], ['anotherPath']])
    })

    it('api event', () => {
      let store = createStore({ myPath: 'data' })
      let events: string[] = []

      let un = onGet(store, () => events.push('some Data'))

      let un2 = onGet(store, (original, api) => {
        events.push('wake up, Neo')
        api.event.stop()
      })

      store.get('myPath')

      un()
      un2()

      expect(events).toEqual(['wake up, Neo'])
    })

    it('api shared', () => {
      let store = createStore({ myPath: 'data' })
      let events: unknown[] = []

      let un = onGet(store, (original, api) => {
        events.push(api.shared)
      })

      let un2 = onGet(store, (original, api) => {
        api.shared.test = 1
      })

      store.get('myPath')

      un()
      un2()

      expect(events).toEqual([{ test: 1 }])
    })
  })
})
