import { QXStore } from '../create-store'

type Commit = {
  storeName: string
  store: any
  path: string
  value: any
  [key: string]: any
}

type Enhancer = {
  commit: (args: Commit) => void
  storeName: string
  store: any
  path: string
  value: any
  [key: string]: any
}

/**
 * Enhance your store.
 * Works like middlewares.
 *
 * ```js
 * const store = createStore('test', { some: { path: 0 } })
 * use([store], ({ commit, storeName, path, ...rest }) => {
 *    // do something and use commit to create reaction
 *    commit({ storeName, path, ...rest })
 * })
 * ```
 *
 * @param stores Array of stores.
 * @param enhancer Callback for handling change.
 */
export function use(
  stores: QXStore<any>[],
  enhancer: (args: Enhancer) => void
): () => void

export function use<Data1>(
  stores: [QXStore<Data1>],
  enhancer: (args: Enhancer) => void
): () => void

export function use<Data1, Data2>(
  stores: [QXStore<Data1>, QXStore<Data2>],
  enhancer: (args: Enhancer) => void
): () => void

export function use<Data1, Data2, Data3>(
  stores: [QXStore<Data1>, QXStore<Data2>, QXStore<Data3>],
  enhancer: (args: Enhancer) => void
): () => void

export function use<Data1, Data2, Data3, Data4>(
  stores: [QXStore<Data1>, QXStore<Data2>, QXStore<Data3>, QXStore<Data4>],
  enhancer: (args: Enhancer) => void
): () => void
