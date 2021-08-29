import type { DotXStore } from '../create-store'
import type { ReadableStore } from '../computed'
import type { DotXAtom } from '../create-atom'

type EffectDep<Data> = DotXStore<Data> | ReadableStore<Data> | DotXAtom

export function effect(store: EffectDep<any>, cb: () => void): () => void

export function effect(store: EffectDep<any>[], cb: () => void): () => void
