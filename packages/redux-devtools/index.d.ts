import { DotXAtom, DotXStore } from 'dotto.x'

export function reduxDevtools(deps: {
  [key: string]: DotXStore<any> | DotXAtom<any>
}): () => void
