import { jest } from '@jest/globals'

import { ResolveType } from './get'

jest.useFakeTimers()

interface TestClass {
  normal: string
  nested: {
    a: number
    b: {
      c: boolean
    }
  }
  arr: number[]
  nestedArr: {
    sum: number
    other: null
  }[]
  deep: {
    arr: string[]
  }
  deeplvl1: {
    deeplvl2: {
      some: 1
      deeplvl3: {
        deeplvl4: {
          deeplvl5: {
            value: RegExp
          }
        }
      }[]
    }
  }[]
}

const AssertType = <T>(expect: [T] extends [never] ? never : T): T => expect

describe('type get testing', () => {
  it('1 level obj', () => {
    type Assertion = ResolveType<TestClass, 'arr'>
    expect(AssertType<Assertion>([1])).toEqual([1])
  })
  it('1 level string', () => {
    type Assertion = ResolveType<TestClass, 'normal'>
    expect(AssertType<Assertion>('sss')).toEqual('sss')
  })

  it('1 level object', () => {
    type Assertion = ResolveType<TestClass, 'deep'>
    expect(AssertType<Assertion>({ arr: ['s'] })).toEqual({ arr: ['s'] })
  })

  it('nested object', () => {
    type Assertion = ResolveType<TestClass, 'nested.b.c'>
    expect(AssertType<Assertion>(true)).toEqual(true)
  })

  it('deep', () => {
    type Assertion = ResolveType<
      TestClass,
      'deeplvl1.0.deeplvl2.deeplvl3.0.deeplvl4.deeplvl5.value'
    >
    expect(AssertType<Assertion>(/ss/)).toEqual(/ss/)
  })

  it('not exists', () => {
    type Assertion = ResolveType<TestClass, 'deep.dsadsa'>
    let nope = false as never
    expect(AssertType<Assertion>(nope)).toEqual(nope)
  })
})
