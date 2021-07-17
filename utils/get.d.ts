type PropertyPath = string

interface NumericDictionary<T> {
  [index: number]: T
}

export function get<TObject extends object, TKey extends keyof TObject>(
  object: TObject,
  path: TKey | [TKey]
): TObject[TKey]

export function get<TObject extends object, TKey extends keyof TObject>(
  object: TObject | null | undefined,
  path: TKey | [TKey]
): TObject[TKey] | undefined

export function get<TObject extends object, TKey extends keyof TObject>(
  object: TObject | null | undefined,
  path: TKey | [TKey]
): Exclude<TObject[TKey], undefined>

export function get<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1]
>(object: TObject, path: [TKey1, TKey2]): TObject[TKey1][TKey2]

export function get<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1]
>(
  object: TObject | null | undefined,
  path: [TKey1, TKey2]
): TObject[TKey1][TKey2] | undefined

export function get<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1]
>(
  object: TObject | null | undefined,
  path: [TKey1, TKey2]
): Exclude<TObject[TKey1][TKey2], undefined>

export function get<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1],
  TKey3 extends keyof TObject[TKey1][TKey2]
>(object: TObject, path: [TKey1, TKey2, TKey3]): TObject[TKey1][TKey2][TKey3]

export function get<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1],
  TKey3 extends keyof TObject[TKey1][TKey2]
>(
  object: TObject | null | undefined,
  path: [TKey1, TKey2, TKey3]
): TObject[TKey1][TKey2][TKey3] | undefined

export function get<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1],
  TKey3 extends keyof TObject[TKey1][TKey2]
>(
  object: TObject | null | undefined,
  path: [TKey1, TKey2, TKey3]
): Exclude<TObject[TKey1][TKey2][TKey3], undefined>

export function get<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1],
  TKey3 extends keyof TObject[TKey1][TKey2],
  TKey4 extends keyof TObject[TKey1][TKey2][TKey3]
>(
  object: TObject,
  path: [TKey1, TKey2, TKey3, TKey4]
): TObject[TKey1][TKey2][TKey3][TKey4]

export function get<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1],
  TKey3 extends keyof TObject[TKey1][TKey2],
  TKey4 extends keyof TObject[TKey1][TKey2][TKey3]
>(
  object: TObject | null | undefined,
  path: [TKey1, TKey2, TKey3, TKey4]
): TObject[TKey1][TKey2][TKey3][TKey4] | undefined

export function get<
  TObject extends object,
  TKey1 extends keyof TObject,
  TKey2 extends keyof TObject[TKey1],
  TKey3 extends keyof TObject[TKey1][TKey2],
  TKey4 extends keyof TObject[TKey1][TKey2][TKey3]
>(
  object: TObject | null | undefined,
  path: [TKey1, TKey2, TKey3, TKey4]
): Exclude<TObject[TKey1][TKey2][TKey3][TKey4], undefined>

export function get<T>(object: NumericDictionary<T>, path: number): T

export function get<T>(
  object: NumericDictionary<T> | null | undefined,
  path: number
): T | undefined

export function get<T>(
  object: NumericDictionary<T> | null | undefined,
  path: number
): T

export function get<T>(
  object: NumericDictionary<T> | null | undefined,
  path: number
): T

export function get(object: null | undefined, path: PropertyPath): undefined

export function get<Returns>(object: any, path: PropertyPath): Returns

export function get(object: any, path: PropertyPath): any
