import { DotXStore, ResolveType, ReadableStore, BindedStore } from 'dotto.x'
import { Ref } from 'vue'

export type Refable<Type> = Ref<Type> | Type

export function useStore<Data extends any>(store: DotXStore<Data>): Data
export function useStore<Store extends ReadableStore>(
  store: Store
): Ref<ReturnType<Store['get']>>

export function useStore<Store extends BindedStore>(
  store: Store
): Ref<ReturnType<Store['get']>>

export function useStore<Data, Selector extends Refable<Selector>>(
  store: DotXStore<Data>,
  selector: Selector
): Ref<ResolveType<Data, Selector>>
