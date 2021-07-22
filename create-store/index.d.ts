/* eslint-disable no-shadow */
import { ResolveType } from '../utils/get'

type DataStore<State = {}> = {
  data: State
}

export type QXStore<State> = {
  get(path?: undefined): State
  get<Path extends string>(
    path: Path
  ): ResolveType<DataStore<State>, `data.${Path}`>

  set(path?: unknown, payload: any): any
  set<Path extends string>(
    path: Path,
    payload: any
  ): ResolveType<DataStore<State>, `data.${Path}`>

  emit(arg: any): void

  listen(
    path: null | undefined,
    cb: (path: null, value: State, acc: any) => void
  ): () => void
  listen<ListenPath extends string>(
    path: ListenPath,
    cb: (
      path: ListenPath,
      value: ResolveType<DataStore<State>, `data.${ListenPath}`>,
      acc: any
    ) => void
  ): () => void

  off(): void
}
/**
 * Hi
 */
export function createStore<Name extends string, State>(
  name: Name,
  initial?: State = {}
): QXStore<State>
