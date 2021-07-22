import { prevValueEnhancer } from '.'
import { createStore } from '../../create-store'

describe('prev value enhancer:', () => {
  it('base', () => {
    expect.assertions(4)
    const testingStore = createStore('test', { some: { path: 0 } })
    prevValueEnhancer([testingStore])
    let prev: number
    const unbind = testingStore.listen('some.path', (path, value, acc: any) => {
      expect(prev).toBe(acc.prevValue)
    })
    prev = 1
    testingStore.set('some.path', 1)
    prev = 1
    testingStore.set('some.path', 2)
    prev = 2
    testingStore.set('some.path', 3)
    prev = 3
    testingStore.set('some.path', 4)

    unbind()
  })
})
