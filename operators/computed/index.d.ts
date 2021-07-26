/* eslint-disable no-shadow */
import { DotXStore } from '../../create-store'

export function computed<Callback>(
  stores: DotXStore<any>[],
  cb: Callback
): {
  subscribe: (cb: (result: ReturnType<Callback>) => void) => () => void
}
