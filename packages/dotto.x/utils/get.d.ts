/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/array-type */
export type ResolveType<
  ObjectType,
  Path extends string
> = Path extends keyof ObjectType
  ? ObjectType[Path]
  : ObjectType extends Array<infer U>
  ? Path extends `${number}.${infer RightSide}`
    ? RightSide extends keyof U
      ? ResolveType<U, RightSide>
      : Path extends `${number}.${infer RightSide}.${infer OtherSide}`
      ? RightSide extends keyof U
        ? ResolveType<U, `${RightSide}.${OtherSide}`>
        : never
      : never
    : Path extends `${number}`
    ? U
    : never
  : Path extends `${infer LeftSide}.${infer RightSide}`
  ? LeftSide extends keyof ObjectType
    ? ResolveType<ObjectType[LeftSide], RightSide>
    : never
  : never

export function get<ObjecType, Path extends string>(
  obj: ObjecType,
  path: Path
): ResolveType<ObjecType, Path>
