import type { DotXStore } from '../create-store'
import type { ReadableStore } from '../computed'
import type { DotXAtom } from '../create-atom'

export function mount<Data>(
  store: DotXStore<Data> | ReadableStore<Data> | DotXAtom<Data>,
  cb: () => void
): () => void
