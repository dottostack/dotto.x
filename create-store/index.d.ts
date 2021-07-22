/* eslint-disable no-shadow */
import { ResolveType } from '../utils/get'

type DataStore<State> = {
  data: State
}

type QXStore<State> = {
  get(path?: unknown): State
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
    path: string,
    cb: (path: string, value: any, acc: any) => void
  ): () => void
  off(): void
}

export function createStore<Name extends string, State>(
  name: Name,
  initial?: State = {}
): QXStore<State>
