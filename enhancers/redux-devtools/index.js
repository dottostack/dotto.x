import { action } from '../../decorators/action'
import { use } from '../../use-enhancer'

const getRDT = () =>
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__

function instanceId() {
  if (typeof document === 'object') {
    return `${document.title}`
  }
  return 'no title instance'
}

const RDT = () => {
  const rdt = getRDT()
  if (!rdt) {
    return {
      call: () => {},
      off: () => {},
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

  const off = () => connected.disconnect()
  return { call, off, sub: connected.subscribe, unsub: connected.unsubscribe }
}

export const reduxDevtoolsEnhancer = ([...stores]) => {
  const { call, off, sub } = RDT()
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
    silentReinit(state)
  }
  stores.forEach(store => {
    const silentReinit = action(store, 'SILENT_REINIT', value =>
      store.set('', value)
    )
    sub(ext => handleRDT(ext, silentReinit))
  })
  const unsue = use(stores, enhancer)
  return () => {
    off()
    unsue()
  }
}
