import { createStore } from '../../create-store'
import { query } from '.'

const AssertType = <T>(expect: [T] extends [never] ? never : T): T => expect

describe('query:', () => {
  it('base', () => {
    expect.assertions(9)
    const testingStore = createStore<
      'test',
      { some: { user: { name?: string; age?: number; location?: string } } }
    >('test', { some: { user: {} } })

    let predict: any
    const select = {
      name: 'some.user.name',
      age: 'some.user.age',
      location: 'some.user.location'
    } as const

    const unbind = query(testingStore, select).subscribe(
      ({ name, age, location }) => {
        type Name = string | undefined
        type Age = number | undefined
        type Location = string | undefined
        expect(AssertType<Name>(name)).toEqual(predict.name)
        expect(AssertType<Age>(age)).toEqual(predict.age)
        expect(AssertType<Location>(location)).toEqual(predict.location)
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
