import { DotXStore, ResolveType, ReadableStore, BindedStore } from 'dotto.x'

export function useStore<Data extends any>(store: DotXStore<Data>): Data
export function useStore<Store extends ReadableStore>(
  store: Store
): ReturnType<Store['get']>

export function useStore<Store extends BindedStore>(
  store: Store
): ReturnType<Store['get']>

export function useStore<Data, Selector extends string>(
  store: DotXStore<Data>,
  selector: Selector
): ResolveType<Data, Selector>


