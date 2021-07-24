import { DotXStore } from '../create-store'

type Commit = {
  storeName: string
  store: any
  path: string
  value: any
  [key: string]: any
}

type Enhancer<Store> = {
  commit: (args: Commit) => void
  storeName: string
  store: Store
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
 * use(store, ({ commit, storeName, path, ...rest }) => {
 *    // do something and use commit to create reaction
 *    commit({ storeName, path, ...rest })
 * })
 * ```
 *
 * @param stores Store instance.
 * @param enhancer Callback for handling change.
 */
export function use<Data>(
  store: DotXStore<Data>,
  enhancer: (args: Enhancer<DotXStore<Data>>) => void
): () => void
