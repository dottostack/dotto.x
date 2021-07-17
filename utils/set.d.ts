type PropertyPath = string

export function set<T extends object>(
  object: T,
  path: PropertyPath,
  value: any
): T

export function set<TResult>(
  object: object,
  path: PropertyPath,
  value: any
): TResult

export function set<TResult, TValue>(
  object: object,
  path: PropertyPath,
  value: TValue
): TResult
