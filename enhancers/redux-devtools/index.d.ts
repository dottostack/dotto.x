import type { QXStore } from '../../create-store'

export function reduxDevtoolsEnhancer([...stores]: [QXStore]): () => void
