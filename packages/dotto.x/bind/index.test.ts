import { createStore } from '../create-store'
import { onSet } from '../lifecycle'
import { bind } from './index'

describe('bind', () => {
  it('get', () => {
    let store = createStore({ some: 1 })
    let some = bind(store, 'some')
    expect(some.get()).toBe(1)
  })

  it('set', () => {
    let store = createStore({ some: 1 })
    let some = bind(store, 'some')
    expect(some.set(2)).toBe(2)
    expect(some.get()).toBe(2)
    expect(store.get('some')).toBe(2)
  })

  it('use plugin', () => {
    let store = createStore({ some: 1 })
    let events: string[] = []
    let some = bind(store, 'some')

    onSet(store, ([path]) => {
      events.push(path as string)
    })

    some.set(2)
    some.set(3)
    expect(events).toEqual(['some', 'some'])
  })
})
