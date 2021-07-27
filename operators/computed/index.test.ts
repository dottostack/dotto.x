import { computed } from '.'
import { createStore } from '../../create-store'

describe('computed function:', () => {
  it('base', () => {
    expect.assertions(5)

    const store = createStore('test', {
      some: { deep: { path: 3, test: 2, some: 4 } }
    })

    const someDataGetter = computed([store], () => {
      const path = store.get('some.deep.path')
      // tree 2
      if (path > 554) {
        return store.get('some.deep.path') * store.get('some.deep.test')
      }
      // tree 1
      return path
    })
    let exp = 3
    const unsub = someDataGetter.subscribe(value => {
      expect(value).toBe(exp)
    })

    // tree 1
    exp = 333
    store.set('some.deep.path', 333)
    // tree 1
    exp = 444
    store.set('some.deep.path', 444)
    // tree 2
    exp = 1110
    store.set('some.deep.path', 555)

    unsub()

    // tree 2 after re-subscribe
    exp = 1554
    store.set('some.deep.path', 777)

    const unsub2 = someDataGetter.subscribe(value => {
      expect(value).toBe(exp)
    })
    unsub2()
  })
})
