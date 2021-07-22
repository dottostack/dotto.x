import { QXStore } from '../../create-store'

/**
 * Wrap your function and mark this function as action for enhancers
 *
 * @param store Store instance.
 * @param actionName Loging name.
 * @param cb Your own function.
 * @returns Your own function.
 */
export function action<
  Store extends QXStore,
  ActionName extends string,
  Callback
>(store: Store, actionName: ActionName, cb: Callback): Callback
