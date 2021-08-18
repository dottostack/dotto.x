import { DotXStore } from '../create-store'
import { Subscribable } from '../computed'

export function mount<Data>(
  store: DotXStore<Data> | Subscribable<Data>,
  cb: () => void
): () => void
