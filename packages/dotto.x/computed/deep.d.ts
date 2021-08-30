import type { DotXStore } from '../create-store'
import type { ResolveType } from '../utils/get'
import type { DotXAtom } from '../create-atom'
import type { ReadableStore } from './computed'

export function deep<Sub extends ReadableStore>(
  dep: Sub
): ReturnType<Sub['get']>

export function deep<Data>(dep: DotXAtom<Data>): Data

export function deep<Data>(dep: DotXStore<Data>): Data

export function deep<Data, Query extends string>(
  dep: DotXStore<Data>,
  query: Query
): ResolveType<Data, Query>
