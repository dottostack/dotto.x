export type Subscribable<Cb> = {
  subscribe: (cb: (result: ReturnType<Cb>) => void) => () => void
  listen: (cb: (result: ReturnType<Cb>) => void) => () => void
  take: () => ReturnType<Cb>
}

export function computed<Callback extends Function>(
  cb: Callback
): Subscribable<Callback>
