import { get_or_create } from '../../utils/get_or_create'
import { keys } from '../adapter/events'

const createListener = () =>
  keys.reduce((acc, event) => ({ ...acc, [event]: [] }), {})

export const listener = (storage, store) => {
  return get_or_create(storage, store, createListener)
}
