import { jest } from '@jest/globals'

import { computed, take } from '../computed'
import { createAtom } from './index'

jest.useFakeTimers()

describe('atom', () => {
  it('listen', async () => {
    expect.assertions(3)
    let store = createAtom({ some: { path: 0 } })
    let unbind = store.listen(value => {
      expect(value).toBe(store.get())
    })

    store.set({ some: { path: 1 } })
    store.set({ some: { path: 2 } })
    expect(store.get()).toEqual({ some: { path: 2 } })
    unbind()
  })

  it('subscribe', () => {
    expect.assertions(4)
    let store = createAtom({ some: { path: 0 } })
    let unbind = store.subscribe(value => {
      expect(value).toBe(store.get())
    })

    store.set({ some: { path: 1 } })
    store.set({ some: { path: 2 } })
    expect(store.get()).toEqual({ some: { path: 2 } })
    unbind()
  })

  it('use computed function', () => {
    let events: number[] = []
    let time = createAtom(1)
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

  it('store off', () => {
    let events: number[] = []
    let time = createAtom(1)
    let num = computed(() => {
      return 10 + take(time)
    })
    num.subscribe(value => {
      events.push(value)
    })
    time.set(2)
    time.set(3)
    expect(events).toEqual([11, 12, 13])
    time.off()
  })

  it('default value', () => {
    let events: any[] = []
    let time = createAtom()
    time.listen(() => {})
    time.listen(() => {})
    time.listen(() => {})
    let unsub = time.subscribe(value => {
      events.push(value)
    })
    time.set({ test: 2 })
    time.set({ test: 3 })
    expect(events).toEqual([{}, { test: 2 }, { test: 3 }])
    unsub()
  })
})
