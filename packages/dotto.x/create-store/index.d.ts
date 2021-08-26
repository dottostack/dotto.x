/* eslint-disable no-shadow */
import { ResolveType } from '../utils/get'

type DataStore<State = {}> = {
  d: State
}

export type DotXStore<State> = {
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
  ): ResolveType<DataStore<State>, `d.${Path}`>

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
    payload: ResolveType<DataStore<State>, `d.${Path}`>
  ): ResolveType<DataStore<State>, `d.${Path}`>
  set(path?: null | undefined | '', payload: State): State

  emit(arg: any): void

  /**
   * Subscribe to store changes.
   *
   * @param path Path with dots to your data.
   * @param cb Callback with store value.
   * @returns Function to remove listener.
   */
  watch(
    path: null | undefined,
    cb: (path: null, value: State, acc: any) => void
  ): () => void
  watch<ListenPath extends string>(
    path: ListenPath,
    cb: (
      path: ListenPath,
      value: ResolveType<DataStore<State>, `d.${ListenPath}`>,
      acc: any
    ) => void
  ): () => void

  listen(cb: (value: State) => void): () => void
  subscribe(cb: (value: State) => void): () => void

  off(): void
}

/**
 * Define simple store.
 *
 * ```js
 * const store = createStore({ some: { path: 0 } })
 * ```
 *
 * @param name Name of your initializing store.
 * @param initial Your initial data or interface.
 * @returns The store object with methods to subscribe, get and set.
 */
export function createStore<State>(initial?: State = {}): DotXStore<State>
