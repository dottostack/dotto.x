export type ReadableStore<Cb> = {
  subscribe: (cb: (result: ReturnType<Cb>) => void) => () => void
  listen: (cb: (result: ReturnType<Cb>) => void) => () => void
  get: () => ReturnType<Cb>
}

export function computed<Callback extends Function>(
  cb: Callback
): ReadableStore<Callback>
