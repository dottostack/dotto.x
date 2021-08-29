import type { DotXStore } from '../create-store'
import type { BindedStore } from '../computed'
import type { DotXAtom } from '../create-atom'
/**
 * TODO
 * @param store
 * @param cb
 */
export function update<Data extends any>(
  store: DotXStore<Data> | DotXAtom<Data>,
  cb: (data: Data) => Data
): Data

export function update<Store extends BindedStore>(
  store: Store,
  cb: (data: ReturnType<Store['get']>) => ReturnType<Store['get']>
): ReturnType<Store['get']>
