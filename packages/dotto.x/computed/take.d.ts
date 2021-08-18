/* eslint-disable no-shadow */
import type { ReadableStore } from './computed'

import { DotXStore } from '../create-store'
import { ResolveType } from '../utils/get'

export function take<Sub extends ReadableStore>(dep: Sub): ReturnType<Sub.get>

export function take<Data, Query extends string>(
  dep: DotXStore<Data>,
  query: Query
): ResolveType<Data, Query>
