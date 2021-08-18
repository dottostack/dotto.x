import { DotXStore, ReadableStore } from 'dotto.x'

type EffectDep<Data> = DotXStore<Data> | ReadableStore<Data>

export function fetch<T>(
  deps: EffectDep<any>,
  input: RequestInfo,
  init?: RequestInit
): Promise<T>

export function fetch<T>(
  deps: EffectDep<any>[],
  input: RequestInfo,
  init?: RequestInit
): Promise<T>

export function fetchJson<T>(
  deps: EffectDep<any>,
  input: RequestInfo,
  init?: RequestInit
): Promise<T>

export function fetchJson<T>(
  deps: EffectDep<any>[],
  input: RequestInfo,
  init?: RequestInit
): Promise<T>
