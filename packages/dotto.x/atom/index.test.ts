import { jest } from '@jest/globals'

import { computed, take } from '../computed'
import { atom } from './index'

jest.useFakeTimers()

describe('atom:', () => {
  it('listen', async () => {
    expect.assertions(2)
    let store = atom({ some: { path: 0 } })
    let unbind = store.listen(value => {
      expect(value).toBe(store.get())
    })

    store.set({ some: { path: 1 } })
    store.set({ some: { path: 2 } })
    unbind()
  })

  it('subscribe', () => {
    expect.assertions(3)
    let store = atom({ some: { path: 0 } })
    let unbind = store.subscribe(value => {
      expect(value).toBe(store.get())
    })

    store.set({ some: { path: 1 } })
    store.set({ some: { path: 2 } })
    unbind()
  })

  it('use computed function', () => {
    let events: number[] = []
    let time = atom(1)
    let num = computed(() => {
      return 10 + take(time)
    })
    let unsub = num.subscribe(value => {
      events.push(value)
    })
    time.set(2)
    time.set(3)
    expect(events).toEqual([11, 12, 13])
    unsub()
  })
})
