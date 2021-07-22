import type { QXStore } from '../../create-store'

export function prevValueEnhancer([...stores]: [QXStore]): () => void
