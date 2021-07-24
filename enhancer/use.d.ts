/* eslint-disable no-shadow */
import { DotXStore } from '../create-store'

export function use<Data>(
  store: DotXStore<Data>,
  ...enhancers: ((store: DotXStore<Data>) => () => void)[]
): () => void
