import { QXStore } from '../../create-store'
import { ResolveType } from '../../utils/get'

export function useSelector<Data, Selector extends string>(
  store: QXStore<Data>,
  selector: Selector
): ResolveType<Data, Selector>
