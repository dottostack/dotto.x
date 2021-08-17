import { DotXStore, Subscribable } from 'dotto.x'

type EffectDep<Data> = DotXStore<Data> | Subscribable<Data>

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
