import { createStore } from '../create-store'
import { computed } from '../computed'
import { take } from '../computed/take'
import { effect } from './index'

describe('effect', () => {
  it('store off', () => {
    let events: string[] = []
    let store = createStore({ some: 1 })
    let unsub = effect(store, () => {
      events.push('woof')
    })
    store.listen(() => {})
    store.off()
    unsub()
    expect(events).toEqual(['woof', 'woof'])
  })

  it('store off unbind', () => {
    let events: string[] = []
    let store = createStore({ some: 1 })
    let unsub = effect(store, () => {
      events.push('woof')
      return () => {
        unsub()
      }
    })
    store.listen(() => {})
    store.off()
    unsub()
    expect(events).toEqual(['woof'])
  })

  it('store handle getter', () => {
    let events: string[] = []
    let store = createStore({ some: 1 })
    let getter = computed(() => take(store, 'some'))
    let unsub = effect(getter, () => {
      events.push('woof')
    })
    getter.subscribe(() => {})
    store.set('some', 2)
    unsub()
    expect(events).toEqual(['woof', 'woof'])
  })

  it('store handle getter unbind', () => {
    let events: string[] = []
    let store = createStore({ some: 1 })
    let getter = computed(() => take(store, 'some'))
    let unsub = effect(getter, () => {
      events.push('woof')
      return () => {
        unsub()
      }
    })
    getter.subscribe(() => {})
    store.set('some', 2)
    unsub()
    expect(events).toEqual(['woof'])
  })

  it('some deps', () => {
    let events: string[] = []
    let store = createStore({ some: 1 })
    let getter = computed(() => take(store, 'some'))
    let unsub = effect([getter, store], () => {
      events.push('woof')
    })
    getter.subscribe(() => {})
    store.off()
    unsub()
    expect(events).toEqual(['woof', 'woof'])
  })
})
