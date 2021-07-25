/* eslint-disable no-shadow */
import { DotXStore } from '../create-store'
import { ResolveType } from '../utils/get'

export function query<Data, T extends const>(
  store: DotXStore<Data>,
  query: T,
  cb: (
    result: {
      [K in keyof T]: ResolveType<Data, T[K]>
    }
  ) => void
): () => void
