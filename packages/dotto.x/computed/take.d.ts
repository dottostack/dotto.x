/* eslint-disable no-shadow */
import type { ReadableStore } from './computed'
import type { DotXStore } from '../create-store'
import type { ResolveType } from '../utils/get'
import type { DotXAtom } from '../create-atom'

export function take<Sub extends ReadableStore>(
  dep: Sub
): ReturnType<Sub['get']>

export function take<Data>(
  dep: DotXAtom<Data>,
): Data

export function take<Data, Query extends string>(
  dep: DotXStore<Data>,
  query: Query
): ResolveType<Data, Query>
