import { walk } from './walk'

export const get = (object, path) => {
  return walk(object, path)
}
