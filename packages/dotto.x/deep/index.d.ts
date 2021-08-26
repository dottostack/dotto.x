import { DotXStore } from '../create-store'
import { ReadableStore } from '../computed'

export function deep<Data>(store: DotXStore<Data>): ReadableStore<() => Data>
