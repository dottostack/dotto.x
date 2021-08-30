import { onChange, onCreate, onGet, onOff, onSet } from '../lifecycle'
import { run_all } from '../utils/run_all'
import { createAtom } from './index'

describe('atom lifecycle', () => {
  it('onCreate (from listen)', () => {
    let events: string[] = []
    let atom = createAtom(2)
    let unsubHook = onCreate(atom, () => events.push('ok'))
    let unsubAtom = atom.listen(() => {})
    expect(events).toEqual(['ok'])
    run_all([unsubHook, unsubAtom])
  })

  it('onCreate (from subscribe)', () => {
    let events: string[] = []
    let atom = createAtom(2)
    let unsubHook = onCreate(atom, () => events.push('ok'))
    let unsubAtom = atom.subscribe(() => {})
    expect(events).toEqual(['ok'])
    run_all([unsubHook, unsubAtom])
  })

  it('onCreate (do not call)', () => {
    let events: string[] = []
    let atom = createAtom(2)
    let unsubAtom = atom.subscribe(() => {})
    let unsubHook = onCreate(atom, () => events.push('ok'))
    atom.subscribe(() => {})
    expect(events).toEqual([])
    run_all([unsubHook, unsubAtom])
  })

  it('onOff (from listen)', () => {
    let events: string[] = []
    let atom = createAtom(2)
    let unsubHook = onOff(atom, () => events.push('ok'))
    let unsubAtom = atom.listen(() => {})
    unsubAtom()
    expect(events).toEqual(['ok'])
    unsubHook()
  })

  it('onOff (from subscribe)', () => {
    let events: string[] = []
    let atom = createAtom(2)
    let unsubHook = onOff(atom, () => events.push('ok'))
    let unsubAtom = atom.subscribe(() => {})
    unsubAtom()
    expect(events).toEqual(['ok'])
    unsubHook()
  })

  it('onSet', () => {
    let events: string[] = []
    let atom = createAtom(2)
    let unsubHook = onSet(atom, () => events.push('ok'))
    atom.set(3)
    expect(events).toEqual(['ok'])
    unsubHook()
  })

  it('onSet (abort)', () => {
    let events: string[] = []
    let atom = createAtom(2)
    let unsubHook = onSet(atom, (_, { methods }) => {
      methods.abort()
    })
    atom.listen(() => {
      events.push('i will never call')
    })
    atom.set(3)
    expect(events).toEqual([])
    unsubHook()
  })

  it('onChange', () => {
    let events: string[] = []
    let atom = createAtom(2)
    let unsubHook = onChange(atom, () => events.push('ok'))
    atom.set(3)
    expect(events).toEqual(['ok'])
    unsubHook()
  })

  it('onChange (abort)', () => {
    let events: string[] = []
    let atom = createAtom(2)
    let unsubHook = onChange(atom, (_, { methods }) => {
      methods.abort()
    })
    atom.listen(() => {
      events.push('i will never call')
    })
    atom.set(3)
    expect(events).toEqual([])
    unsubHook()
  })

  it('onGet', () => {
    let events: string[] = []
    let atom = createAtom(2)
    let unsubHook = onGet(atom, () => events.push('ok'))
    atom.get()
    expect(events).toEqual(['ok'])
    unsubHook()
  })
})
