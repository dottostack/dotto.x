import { computed, createAtom, take } from 'dotto.x'
import { onChange } from 'dotto.x/lifecycle'
import { get } from 'dotto.x/utils/get'

export const validator = (store, rules) => {
  let errors = createAtom({})
  let valid = computed(() => !Object.values(take(errors)).filter(a => a).length)

  let destroy = onChange(store, (_, { methods }) => {
    for (let { path, validators } of rules) {
      let target = get(store.get(), path)
      let reason
      validators.some(rule => {
        let res = rule(target, methods)
        if (res) reason = res
        return res
      })
      errors.set({ ...errors.get(), [path]: reason })
    }
  })
  return { errors, destroy, valid }
}
