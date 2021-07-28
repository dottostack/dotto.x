/* eslint-disable no-shadow */
import { DotXStore } from '../../create-store'

type Subscribable<Cb> = {
  dependecies: (DotXStore<unknown> | ReturnType<computed<unknown>>)[]
  run: () => ReturnType<Cb>
  subscribe: (cb: (result: ReturnType<Cb>) => void) => () => void
}

export function computed<Callback extends Function>(
  dependencies: (DotXStore<unknown> | ReturnType<computed<unknown>>)[],
  cb: Callback
): Subscribable<Callback>
