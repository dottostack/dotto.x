import { computed, createStore, take } from 'dotto.x'
import { onSet } from 'dotto.x/lifecycle'

export const validator = (store, rules, config = {}) => {
  let errorsStore = createStore({})
  let errors = computed(() => take(errorsStore))
  let valid = computed(() => !Object.values(take(errors)).filter(a => a).length)
  let container = rules.reduce(
    (acc, { path, validators }) => ({ ...acc, [path]: validators }),
    {}
  )
  let destroy = onSet(store, ([path, value], { methods }) => {
    let target = container[path]
    if (!target) return
    let reason
    let hasError = target.some(rule => {
      let res = rule(value, methods)
      if (res) reason = res
      return res
    })
    errorsStore.set(path, reason)
    if (hasError && config.abort) {
      methods.abort()
    }
  })
  return { errors, destroy, valid }
}
