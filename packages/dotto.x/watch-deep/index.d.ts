/* eslint-disable no-shadow */
import { DotXStore } from '../create-store'
import { ResolveType } from '../utils/get'

export function watchDeep<Data, Path extends string>(
  store: DotXStore<Data>,
  cb: (path: string, value: ResolveType<Data, Path>) => void
): () => void
