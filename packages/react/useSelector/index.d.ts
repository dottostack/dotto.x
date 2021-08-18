import { DotXStore, ResolveType } from 'dotto.x'

export function useSelector<Data, Selector extends string>(
  store: DotXStore<Data>,
  selector: Selector
): ResolveType<Data, Selector>
