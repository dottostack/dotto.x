import { DotXStore } from '../create-store'
import { Subscribable } from '../computed'

type EffectDep<Data> = DotXStore<Data> | Subscribable<Data>

export function effect(store: EffectDep<any>, cb: () => void): () => void

export function effect(store: EffectDep<any>[], cb: () => void): () => void
