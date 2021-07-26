import { computed } from '.'
import { createStore } from '../../create-store'

describe('sss', () => {
  it('sssdd', () => {
    const store = createStore('test', { some: { deep: { path: 3, test: 2 } } })
   const fn =  computed([store], () => {
      console.log('calculate')
      return store.get('some.deep.path') * store.get('some.deep.test')
    })
    const unsub = fn.subscribe(result => { console.log(result); })
    store.set('some.deep.path', 333)
    store.set('some.deep.path', 444)
    store.set('some.deep.path', 555)
    unsub()
    store.set('some.deep.path', 777)
    fn.subscribe(result => { console.log(result); })
  })
})
