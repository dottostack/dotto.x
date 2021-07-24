import { action } from '../../decorators/action'
import { enhance } from '../../enhancer'

const getRDT = () =>
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__

function instanceId() {
  if (typeof document === 'object') {
    return `quarkX ${document.title}`
  }
  return 'no title instance'
}

const RDT = () => {
  const rdt = getRDT()
  if (!rdt) {
    return {
      call: () => {},
      sub: () => {},
      unsub: () => {}
    }
  }
  const connected = rdt.connect({
    instanceId: instanceId()
  })
  const call = ({ store, storeName, actionName, path }) => {
    let type = actionName || path
    connected.send(
      {
        type: `${storeName}: ${type}`,
        payload: store.get()
      },
      store.get()
    )
  }
  return { call, sub: connected.subscribe, unsub: connected.unsubscribe }
}

export const reduxDevtoolsEnhancer = ([...stores]) => {
  const { call, sub, unsub } = RDT()
  const enhancer = ({
    store,
    commit,
    storeName,
    path,
    actionName,
    ...rest
  }) => {
    if (actionName !== 'SILENT_REINIT') {
      call({ store, storeName, path, actionName })
    }
    commit({ storeName, path, actionName, store, ...rest })
  }
  const handleRDT = (extState, silentReinit) => {
    if (
      !extState ||
      !extState.payload ||
      !extState.payload.type ||
      !extState.state
    ) {
      return
    }

    const { type } = extState.payload
    const { state } = extState
    if (type !== 'JUMP_TO_STATE' && type !== 'JUMP_TO_ACTION') return
    let parsed
    try {
      parsed = JSON.parse(state) || {}
    } catch {
      return
    }
    silentReinit(parsed)
  }
  const subs = []
  stores.forEach(store => {
    const silentReinit = action(store, 'SILENT_REINIT', value =>
      store.set(null, value)
    )
    const hadnl = ext => handleRDT(ext, silentReinit)
    sub(hadnl)
  })
  const unsue = enhance(stores, enhancer)
  return () => {
    subs.forEach(_sub => unsub(_sub))
    unsue()
  }
}
