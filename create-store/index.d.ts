/* eslint-disable no-shadow */
import { ResolveType } from '../utils/get'

type DataStore<State = {}> = {
  data: State
}

export type QXStore<State> = {
  /**
   * Get store value.
   *
   * ```js
   * store.get('some.value')
   * ```
   *
   * @param path Path with dots to your data.
   */
  get(path?: undefined): State
  get<Path extends string>(
    path: Path
  ): ResolveType<DataStore<State>, `data.${Path}`>

  /**
   * Change store value.
   *
   * ```js
   * store.set('some.value', value)
   * ```
   *
   * @param path Path with dots to your data.
   */
  set<Path extends string>(
    path: Path,
    payload: ResolveType<DataStore<State>, `data.${Path}`>
  ): ResolveType<DataStore<State>, `data.${Path}`>
  set(path?: null | undefined, payload: State): State

  emit(arg: any): void

  /**
   * Subscribe to store changes.
   *
   * @param path Path with dots to your data.
   * @param cb Callback with store value.
   * @returns Function to remove listener.
   */
  listen(
    path: null | undefined,
    cb: (path: null, value: State, acc: any) => void
  ): () => void
  listen<ListenPath extends string>(
    path: ListenPath,
    cb: (
      path: ListenPath,
      value: ResolveType<DataStore<State>, `data.${ListenPath}`>,
      acc: any
    ) => void
  ): () => void

  off(): void
}

/**
 * Define simple store.
 *
 * ```js
 * import { createStore } from 'quarkx'
 *
 * const store = createStore('test', { some: { path: 0 } })
 *
 * const unbind = store.listen('some.path', (path, value) => {
 *    // do something
 * })
 *
 * store.set('some.path', 3)
 * store.get('some.path')
 * ```
 *
 * @param name Name of your initializing store.
 * @param initial Your initial data or interface.
 * @returns The store object with methods to subscribe, get and set.
 */
export function createStore<Name extends string, State>(
  name: Name,
  initial?: State = {}
): QXStore<State>
