import { jest } from '@jest/globals'

import { get } from './get'

jest.useFakeTimers()

describe('get util:', () => {
  it('from nested object', () => {
    expect(get({ a: { b: 1 } }, 'a.b')).toBe(1)
  })
  it('from nested array', () => {
    expect(get({ a: [1] }, 'a.0')).toBe(1)
  })
})
