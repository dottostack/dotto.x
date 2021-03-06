import { DotXStore } from '../create-store'

export const SILENT_ACTION = 'SILENT_ACTION'

/**
 * Wrap your function and mark this function as action for plugins.
 * ```js
 * const setName = action(store, 'setName', (name) => store.set('user.name', name))
 * setName('John')
 * ```
 * @param store Store instance.
 * @param actionName Loging name.
 * @param cb Your own function.
 * @returns Your own function.
 */
export function action<
  Store extends DotXStore,
  ActionName extends string,
  Callback
>(store: Store, actionName: ActionName, cb: Callback): Callback
