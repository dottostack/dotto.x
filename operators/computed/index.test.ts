/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { computed } from '.'
import { createStore } from '../../create-store'

describe('computed function:', () => {
  it('scoped listeners', () => {
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

  it('containers nesting works correctly', () => {
    expect.assertions(5)
    let pathMultRes: number, nextDataGetterRes: number
    const store = createStore('test', {
      some: { deep: { path: 3, test: 2, some: 4 } }
    })

    const pathMult = computed([store], () => {
      const path = store.get('some.deep.path')
      return path * 2
    })

    const nextDataGetter = computed([pathMult], () => {
      return pathMult.run() / 2
    })
    pathMultRes = 6
    nextDataGetterRes = 3
    const unsub = pathMult.subscribe(val => {
      expect(val).toBe(pathMultRes)
    })
    const unsub2 = nextDataGetter.subscribe(val => {
      expect(val).toBe(nextDataGetterRes)
    })
    pathMultRes = 8
    nextDataGetterRes = 4
    store.set('some.deep.path', 4)
    unsub()
    nextDataGetterRes = 5
    store.set('some.deep.path', 5)
    unsub2()
  })

  it('works without reactive', () => {
    expect.assertions(1)
    const store = createStore('test', {
      some: { deep: { path: 3, test: 2, some: 4 } }
    })

    const pathMult = computed([store], () => {
      const path = store.get('some.deep.path')
      return path * 2
    })

    const nextDataGetter = computed([], () => {
      return pathMult.run() / 2
    })

    const unsub2 = nextDataGetter.subscribe(val => {
      expect(val).toBe(3)
    })
    store.set('some.deep.path', 4)
    store.set('some.deep.path', 5)
    unsub2()
  })

  it('prevents diamond dependency problem', () => {
    const store = createStore('count', { count: 0 })
    const values: string[] = []

    const a = computed([store], () => {
      return 'a' + store.get('count')
    })

    const b = computed([store], () => {
      return 'b' + store.get('count')
    })

    const combined = computed([a, b], () => {
      return a.run() + b.run()
    })

    const unsubscribe = combined.subscribe(v => {
      values.push(v)
    })

    expect(values).toEqual(['a0b0'])

    store.set('count', 1)
    expect(values).toEqual(['a0b0', 'a1b1'])

    unsubscribe()
  })

  it('listen', () => {
    expect.assertions(3)
    let predict = 0
    const store = createStore('count', { count: 0 })
    const mult = computed([store], () => {
      const count = store.get('count')
      return count * 2
    })
    const unbind = mult.listen(num => {
      expect(num).toBe(predict)
    })
    predict = 2
    store.set('count', 1)
    predict = 4
    store.set('count', 2)
    predict = 6
    store.set('count', 3)
    unbind()
  })
})
