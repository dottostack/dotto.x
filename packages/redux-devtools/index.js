import { onChange } from 'dotto.x/lifecycle'
import { run_all } from 'dotto.x/utils/run_all'

const action = (store, title, cb) => {
  return (...params) => {
    let unbind = onChange(store, (_, { shared }) => {
      shared.actionName = title
    })
    let res = cb(...params)
    unbind()
    return res
  }
}

const getRDT = () =>
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__

function instanceId(storeName = 'default store') {
  return `[dotto.x]: ${storeName}`
}

const RDT = storeName => {
  let rdt = getRDT()
  if (!rdt) {
    return {
      call: () => {},
      subscribe: () => {},
      unsubscribe: () => {}
    }
  }

  let connected = rdt.connect({
    instanceId: instanceId(storeName)
  })

  let call = ({ store, actionName, path }) => {
    let type = actionName || path || 'root'
    connected.send(
      {
        type: `${storeName || 'dotto.x store'}: ${type}`,
        payload: store.get()
      },
      store.get()
    )
  }

  return {
    call,
    subscribe: connected.subscribe,
    unsubscribe: connected.unsubscribe
  }
}

export const reduxDevtools = deps => {
  deps = Object.entries(deps)

  let handleRDT = (extState, silentReinit) => {
    if (
      !extState ||
      !extState.payload ||
      !extState.payload.type ||
      !extState.state
    ) {
      return
    }

    let { type } = extState.payload
    let { state } = extState
    if (type !== 'JUMP_TO_STATE' && type !== 'JUMP_TO_ACTION') return
    let parsed
    try {
      parsed = JSON.parse(state) || {}
    } catch {
      return
    }

    silentReinit(parsed)
  }
  let unuse = deps.map(([storeName, store]) => {
    let { subscribe, call, unsubscribe } = RDT(storeName)

    let silentReinit = action(store, 'SILENT_REINIT', value => {
      store.watch ? store.set(null, value) : store.set(value)
    })

    let hadnl = ext => handleRDT(ext, silentReinit)

    subscribe(hadnl)

    let hasPath = Boolean(store.watch)

    let enhancer = (path, actionName) => {
      if (actionName !== 'SILENT_REINIT') {
        call({ store, path, actionName })
      }
    }

    let unsub = () => unsubscribe(hadnl)
    let unChange = onChange(store, ([path], { shared }) => {
      if (!hasPath) path = ''
      enhancer(path, shared.actionName)
    })
    return () => run_all([unsub, unChange])
  })
  return () => run_all(unuse)
}
