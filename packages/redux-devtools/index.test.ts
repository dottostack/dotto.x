import { createAtom, createStore } from 'dotto.x'

import { reduxDevtools } from './index'

it('test types', () => {
  let someStore = createStore({ some: 'value' })
  let unbind = reduxDevtools({ someStore })
  unbind()
})

it('test types with mutliply stores', () => {
  let someStore = createStore({ some: 'value' })
  let someAnotherStore = createStore({ some: 'value' })
  let someAtomic = createAtom({ some: 'value' })
  let unbind = reduxDevtools({ someStore, someAnotherStore, someAtomic })
  unbind()
})
