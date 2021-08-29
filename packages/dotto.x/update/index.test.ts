import { createStore } from '../create-store'
import { update } from '.'
import { bind } from '../bind'

describe('update', () => {
  it('with store', () => {
    let events: any[] = []
    let store = createStore({ some: 1, test: 1 })

    let unsub = store.listen(state => {
      events.push(state)
    })
    update(store, data => ({ ...data, test: 2 }))
    update(store, data => ({ ...data, test: 3 }))
    update(store, data => ({ ...data, test: 4 }))
    update(store, data => ({ ...data, test: 5 }))
    unsub()
    expect(events).toEqual([
      { some: 1, test: 2 },
      { some: 1, test: 3 },
      { some: 1, test: 4 },
      { some: 1, test: 5 }
    ])
  })

  it('with bind', () => {
    let events: any[] = []
    let store = createStore({ user: 'John', test: 1 })
    let user = bind(store, 'user')
    let unsub = user.listen(state => {
      events.push(state)
    })
    update(user, () => 'Constantine')
    unsub()
    expect(events).toEqual(['Constantine'])
  })
})
