import { createStore } from '../create-store'
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
})
