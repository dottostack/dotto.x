/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { jest } from '@jest/globals'

import { set } from './set'

jest.useFakeTimers()

const testIt = (path: string, value: any, object = {}) => {
  expect(set(object, path, value)).toBe(value)
}

describe('set util:', () => {
  describe('object & autocreate', () => {
    it('1 level', () => {
      testIt('1level', 'check')
      testIt('1level', 1)
      testIt('1level', [])
      testIt('1level', {})
    })
    it('2 level', () => {
      testIt('1level.second', 'check')
      testIt('1level.second', 1)
      testIt('1level.second', [])
      testIt('1level.second', {})
    })
    it('3 level', () => {
      testIt('1level.second.third', 'check')
      testIt('1level.second.third', 1)
      testIt('1level.second.third', [])
      testIt('1level.second.third', {})
    })
  })

  describe('array', () => {
    it('1 level', () => {
      testIt('1', 'check', [])
    })
    it('2 level', () => {
      testIt('1.2', 'check', [[]])
    })
  })
  // проверить когда путь занят
})
