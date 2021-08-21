import { DotXStore } from '../create-store'
import { ResolveType } from '../utils/get'

export interface BindedStore<Data, Path> {
  subscribe: (cb: (result: ResolveType<Data, Path>) => void) => () => void
  listen: (cb: (result: ResolveType<Data, Path>) => void) => () => void
  get: () => ResolveType<Data, Path>
  set: (payload: ResolveType<Data, Path>) => ResolveType<Data, Path>
}

export function bind<Data, Path extends string>(
  store: DotXStore<Data>,
  path: Path
): BindedStore<Data, Path>
