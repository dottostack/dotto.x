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
  let unsub = computed(() => deep(someDeep)).listen(value => {
    data.push(value)
  })

  store.set('some.deep', 2)
  store.set('some.deep', 3)
  store.set('some.deep', 4)
  store.set('some.deep', 5)

  expect(data).toEqual([2, 3, 4, 5])
  expect(someDeep.get()).toBe(5)
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
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
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
