/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { createStore } from '../create-store'
import { computed } from './computed'
import { deep } from './deep'
import { take } from './take'

it('deep', () => {
  type Deep = {
    some: {
      deep: number
      test?: number
    }
  }

  let data: Deep[] = []

  let store = createStore<Deep>({ some: { deep: 1 } })

  let unsub = computed(() => deep(store)).listen(value => {
    data.push(JSON.parse(JSON.stringify(value)))
  })

  store.set('some', { deep: 2 })
  store.set('', { some: { deep: 1 } })
  store.set('', { some: { deep: 1, test: 1 } })
  store.set('some.test', 3)

  expect(data).toEqual([
    { some: { deep: 2 } },
    { some: { deep: 1 } },
    { some: { deep: 1, test: 1 } },
    { some: { deep: 1, test: 3 } }
  ])
  unsub()
})

it('deep store off', () => {
  type Deep = {
    some: {
      deep: number
      test?: number
    }
  }

  let data: Deep[] = []

  let store = createStore<Deep>({ some: { deep: 1 } })

  let unsub = computed(() => deep(store)).listen(value => {
    data.push(JSON.parse(JSON.stringify(value)))
  })

  store.set('some', { deep: 2 })
  store.set('', { some: { deep: 1 } })
  store.set('', { some: { deep: 1, test: 1 } })
  store.off()
  store.set('some.test', 3)

  expect(data).toEqual([
    { some: { deep: 2 } },
    { some: { deep: 1 } },
    { some: { deep: 1, test: 1 } }
  ])
  unsub()
})

it('deep store get by path', () => {
  type Deep = {
    some: {
      deep: number
      test?: number
    }
  }

  let data: number[] = []

  let store = createStore<Deep>({ some: { deep: 1 } })

  let unsub = computed(() => deep(store, 'some.deep')).listen(value => {
    data.push(value)
  })

  store.set('some.deep', 2)
  store.set('some.deep', 3)
  store.set('some.deep', 4)
  store.set('some.deep', 5)

  expect(data).toEqual([2, 3, 4, 5])
  unsub()
})

it('deep store from computed', () => {
  type Deep = {
    some: {
      deep: number
      test?: number
    }
  }

  let data: number[] = []

  let store = createStore<Deep>({ some: { deep: 1 } })
  let someDeep = computed(() => deep(store, 'some.deep'))
  let nextDeep = computed(() => deep(someDeep))
  let unsub = nextDeep.listen(value => {
    data.push(value)
  })

  store.set('some.deep', 2)
  store.set('some.deep', 3)
  store.set('some.deep', 4)
  store.set('some.deep', 5)

  expect(data).toEqual([2, 3, 4, 5])
  expect(someDeep.get()).toBe(5)
  expect(nextDeep.get()).toBe(5)
  unsub()
})

it('prevent watch', () => {
  type Deep = {
    some: {
      deep: number
      test: number
    }
  }

  let data: (number | undefined)[] = []

  let store = createStore<Deep>({ some: { deep: 1, test: 2 } })
  let someDeep = computed(() => take(store, 'some.deep'))
  let unsub = computed(() => {
    let value = take(someDeep)
    return value * deep(store, 'some.test')
  }).listen(value => {
    data.push(value)
  })

  store.set('some.deep', 2)
  store.set('some.deep', 3)
  store.set('some.deep', 4)
  store.set('some.deep', 5)

  expect(data).toEqual([4, 6, 8, 10])
  expect(someDeep.get()).toBe(5)
  unsub()
})

it('prevents diamond dependency problem', () => {
  let store = createStore({ count: 0 })
  let values: string[] = []

  let a = computed(() => {
    return 'a' + deep(store, 'count')
  })

  let b = computed(() => {
    return 'b' + deep(store, 'count')
  })

  let combined = computed(() => {
    return take(a) + take(b)
  })

  let unsubscribe = combined.subscribe(v => {
    values.push(v)
  })

  expect(values).toEqual(['a0b0'])

  store.set('count', 1)
  expect(values).toEqual(['a0b0', 'a1b1'])

  unsubscribe()
})


it('prevent watchss', () => {
  type Deep = {
    some: {
      deep: number
      test: number
    }
  }

  let data: (number | undefined)[] = []

  let store = createStore<Deep>({ some: { deep: 1, test: 2 } })
  let someDeep = computed(() => take(store, 'some.deep'))
  let unsub = computed(() => {
    let value = deep(someDeep)
    return value * deep(store, 'some.test')
  }).listen(value => {
    data.push(value)
  })

  store.set('some.deep', 2)
  store.set('some.deep', 3)
  store.set('some.deep', 4)
  store.set('some.deep', 5)

  expect(data).toEqual([4, 6, 8, 10])
  expect(someDeep.get()).toBe(5)
  unsub()
})

it('works without reactive', () => {
  expect.assertions(1)
  let store = createStore({
    some: { deep: { path: 3, test: 2, some: 4 } }
  })

  let pathMult = computed(() => {
    let path = deep(store, 'some.deep.path')
    return path * 2
  })

  let nextDataGetter = computed(() => {
    return pathMult.get() / 2
  })

  let unsub2 = nextDataGetter.subscribe(val => {
    expect(val).toBe(3)
  })
  store.set('some.deep.path', 4)
  store.set('some.deep.path', 5)
  unsub2()
})

//!!!!

it('re-listen: when listener is last - container will destroy', () => {
  let events: number[] = []
  let store = createStore({ count: 0 })

  let mult = computed(() => {
    let count = deep(store, 'count')
    return count
  })

  let unbind = mult.listen(num => {
    events.push(num)
  })

  store.set('count', 1)
  store.set('count', 2)
  store.set('count', 3)

  unbind()

  let unbind2 = mult.listen(num => {
    events.push(num)
  })

  store.set('count', 12)
  store.set('count', 22)
  store.set('count', 32)

  unbind2()
  expect(events).toEqual([1, 2, 3, 12, 22, 32])
})

it('re-listen: when store is off', () => {
  let events: number[] = []
  let store = createStore({ count: 0 })

  let mult = computed(() => {
    let count = deep(store, 'count')
    return count
  })

  mult.listen(num => {
    events.push(num)
  })

  store.set('count', 1)
  store.set('count', 2)
  store.set('count', 3)

  store.off()
  let unbind2 = mult.listen(num => {
    events.push(num)
  })
  store.set('count', 12)
  store.set('count', 22)
  store.set('count', 32)

  unbind2()
  expect(events).toEqual([1, 2, 3, 12, 22, 32])
})

it.skip('re-listen: when on of many stores are off', () => {
  let events: number[] = []
  let store = createStore({ count: 0 })
  let store2 = createStore({ count: 0 })

  let mult = computed(() => {
    return deep(store, 'count') + deep(store2, 'count')
  })

  mult.listen(num => {
    events.push(num)
  })

  store.set('count', 1)
  store.set('count', 2)
  store.set('count', 3)

  store.off()

  store2.set('count', 12)
  store2.set('count', 22)
  store2.set('count', 32)

  store2.off()

  store2.set('count', 12)
  store2.set('count', 22)
  store2.set('count', 32)

  expect(events).toEqual([1, 2, 3, 15, 25, 35])
})
