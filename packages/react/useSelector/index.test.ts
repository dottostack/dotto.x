import { createStore } from 'dotto.x'

import { useSelector } from './index'

describe('react selector', () => {
  it.skip('base', () => {
    let store = createStore({ some: 1 })
    let data = useSelector(store, 'some')
    expect(data).toBe(1)
  })
})
