/* eslint-disable no-shadow */
import { DotXStore } from '../../create-store'
// import { ResolveType } from '../../utils/get'

export function computed<Callback>(
  stores: DotXStore<unknown>[],
  cb: Callback
): {
  subscribe: (cb: (result: ReturnType<Callback>) => void) => () => void
}
