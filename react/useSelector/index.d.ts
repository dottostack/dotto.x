import { DotXStore } from '../../create-store'
import { ResolveType } from '../../utils/get'

export function useSelector<Data, Selector extends string>(
  store: DotXStore<Data>,
  selector: Selector
): ResolveType<Data, Selector>
