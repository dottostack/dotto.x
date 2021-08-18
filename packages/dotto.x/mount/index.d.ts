import { DotXStore } from '../create-store'
import { ReadableStore } from '../computed'

export function mount<Data>(
  store: DotXStore<Data> | ReadableStore<Data>,
  cb: () => void
): () => void
