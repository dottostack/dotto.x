import { get_or_create } from '../../utils/get_or_create'
import { events } from './events'

const createAdapter = (store, cb) => {
  return Object.entries(events).reduce(
    (acc, [name, creator]) => ({
      ...acc,
      [name]: creator(store, cb.bind(null, name))
    }),
    {}
  )
}

export const adapter = (storage, store, cb, eventUtil) => {
  return get_or_create(storage, store, () =>
    createAdapter(store, cb, eventUtil)
  )
}
