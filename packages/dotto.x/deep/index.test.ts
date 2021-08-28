import { computed, take } from '../computed'
import { createStore } from '../create-store'
import { deep } from './index'

it('deep', () => {
  type Deep = {
    some: {
      deep: number
      test?: number
    }
  }

  let data: Deep[] = []

  let store = createStore<Deep>({ some: { deep: 1 } })

  let unsub = deep(store).listen(value => {
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

  let unsub = deep(store).listen(value => {
    data.push(JSON.parse(JSON.stringify(value)))
  })

  store.set('some', { deep: 2 })
  store.set('', { some: { deep: 1 } })
  store.set('', { some: { deep: 1, test: 1 } })
  store.off()
  store.set('some.test', 3)
})

it('deep as computed part', () => {
  type Deep = {
    some: {
      deep: number
      test?: number
    }
  }

  let data: Deep[] = []

  let store = createStore<Deep>({ some: { deep: 1 } })
  let deepObserved = deep(store)
  let computedWithDeep = computed(() => take(deepObserved))

  let unsub = computedWithDeep.listen(value => {
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
  console.log(deepObserved.get())
  unsub()
})
