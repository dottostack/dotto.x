import { createStore } from 'dotto.x'

import { validator } from './index'

it('validator', () => {
  let events: any[] = []
  let testingStore = createStore({ test: 1 })
  let { errors, destroy, valid } = validator(testingStore, [
    {
      path: 'test',
      validators: [value => (value > 1 ? 'too much' : false)]
    }
  ])
  errors.listen(value => {
    events.push(value.test)
  })
  testingStore.listen('test', (path, value) => {
    events.push(value)
  })
  testingStore.set('test', 2)
  testingStore.set('test', -1)
  expect(valid.get()).toBe(true)
  expect(events).toEqual(['too much', 2, undefined, -1])
  destroy()
})

it('validator abort', () => {
  let events: any[] = []
  let testingStore = createStore({ test: 1 })
  let { errors, destroy, valid } = validator(
    testingStore,
    [
      {
        path: 'test',
        validators: [value => (value > 1 ? 'too much' : false)]
      }
    ],
    { abort: true }
  )
  errors.listen(value => {
    events.push(value.test)
  })
  testingStore.listen('test', (path, value) => {
    events.push(value)
  })
  testingStore.set('test', 2)
  testingStore.set('test', -1)
  expect(valid.get()).toBe(true)
  expect(events).toEqual(['too much', undefined, -1])
  destroy()
})

it('validator with unused value', () => {
  let events: any[] = []
  let testingStore = createStore({ test: 1 })
  let { errors, destroy, valid } = validator(testingStore, [], { abort: true })
  errors.listen(value => {
    events.push(value.test)
  })
  testingStore.listen('test', (path, value) => {
    events.push(value)
  })
  testingStore.set('test', 2)
  testingStore.set('test', -1)
  expect(valid.get()).toBe(true)
  expect(events).toEqual([2, -1])
  destroy()
})
