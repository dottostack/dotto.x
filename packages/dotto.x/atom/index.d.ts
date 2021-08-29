export type DotAtom<State> = {
  /**
   * Get store value.
   *
   * ```js
   * store.get('some.value')
   * ```
   *
   * @param path Path with dots to your data.
   */
  get(): State

  set(payload: State): State

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
export function atom<State>(initial?: State = {}): DotAtom<State>
