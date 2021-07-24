import type { DotXStore } from '../../create-store'

export function reduxDevtoolsEnhancer([...stores]: [DotXStore]): () => void
