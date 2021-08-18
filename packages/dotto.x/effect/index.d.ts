import { DotXStore } from '../create-store'
import { ReadableStore } from '../computed'

type EffectDep<Data> = DotXStore<Data> | ReadableStore<Data>

export function effect(store: EffectDep<any>, cb: () => void): () => void

export function effect(store: EffectDep<any>[], cb: () => void): () => void
