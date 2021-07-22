import { createStore } from '../create-store'
import { query } from './query'

describe('query:', () => {
  it('base', () => {
    expect.assertions(9)
    const testingStore = createStore<
      'test',
      { some: { user: { name?: string; age?: number; location?: string } } }
    >('test', { some: { user: {} } })
    let predict: any
    const unbind = query(
      testingStore,
      {
        name: 'some.user.name',
        age: 'some.user.age',
        location: 'some.user.location'
      },
      ({ name, age, location }: any) => {
        expect(name).toBe(predict.name)
        expect(age).toBe(predict.age)
        expect(location).toBe(predict.location)
      }
    )
    predict = {
      name: 'John',
      age: undefined,
      location: undefined
    }
    testingStore.set('some.user.name', 'John')
    predict = {
      name: 'John',
      age: 33,
      location: undefined
    }
    testingStore.set('some.user.age', 33)
    predict = {
      name: 'John',
      age: 33,
      location: 'USA'
    }
    testingStore.set('some.user.location', 'USA')

    unbind()
  })
})
