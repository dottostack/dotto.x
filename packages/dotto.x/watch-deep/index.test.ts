import { createStore } from '../create-store'
import { watchDeep } from './index'

it('watch-deep', () => {
  type Deep = {
    some: {
      deep: number
      test?: number
    }
  }

  let data: Deep[] = []
  let paths: string[] = []

  let store = createStore<Deep>({ some: { deep: 1 } })

  let unsub = watchDeep(store, (path, value) => {
    paths.push(path)
    data.push(value)
  })

  store.set('some', { deep: 2 })
  store.set('', { some: { deep: 1 } })
  store.set('', { some: { deep: 1, test: 1 } })
  store.set('some.test', 3)

  expect(data).toEqual([
    { deep: 2 },
    { some: { deep: 1 } },
    { some: { deep: 1, test: 3 } },
    3
  ])
  expect(paths).toEqual(['some', '', '', 'some.test'])
  unsub()
})
