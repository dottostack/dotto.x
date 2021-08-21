import { createStore } from '../create-store'
import { query } from './index'

const AssertType = <T>(expect: [T] extends [never] ? never : T): T => expect

describe('query:', () => {
  it('base', () => {
    expect.assertions(13)

    let testingStore = createStore<{
      some: { user: { name?: string; age?: number; location?: string } }
    }>({ some: { user: {} } })

    type Name = string | undefined
    type Age = number | undefined
    type Location = string | undefined
    type Predict = { name: Name; location: Location; age: Age }

    let predict: Predict = {
      name: undefined,
      age: undefined,
      location: undefined
    }
    let select = {
      name: 'some.user.name',
      age: 'some.user.age',
      location: 'some.user.location'
    } as const

    let myOwnQuery = query(testingStore, select)

    let unbind = myOwnQuery.subscribe(({ name, age, location }) => {
      expect(AssertType<Name>(name)).toEqual(predict.name)
      expect(AssertType<Age>(age)).toEqual(predict.age)
      expect(AssertType<Location>(location)).toEqual(predict.location)
    })

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

    expect(myOwnQuery.get()).toEqual(predict)

    unbind()
  })
})
