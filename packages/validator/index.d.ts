import type { DotXStore, ReadableStore } from 'dotto.x'

type Field = {
  path: string
  validators: ((value: any) => string | boolean)[]
}

export function validator<Data extends Object>(
  store: DotXStore<Data>,
  validators: Field[],
  config?: { abort: boolean }
): {
  destroy: () => void
  valid: ReadableStore<() => boolean>
  errors: ReadableStore<() => { [K in keyof Data]?: string | boolean }>
}
