import { createContainer } from './container'

const EMPTY = Symbol.for('empty')

const unique = deps => [
  ...new Set(
    deps.reduce(
      (acc, dep) => (dep.deps ? [...acc, ...dep.deps] : [...acc, dep]),
      []
    )
  )
]

export const computed = (deps, cb) => {
  if (!Array.isArray(deps)) deps = [deps]

  let subscribers = []
  let lastResult = EMPTY

  let emit = () => {
    lastResult = container.call()
    subscribers.forEach(subscriber => {
      subscriber(lastResult)
    })
  }

  let depsWithNested = unique(deps)

  let off = () => {
    container.unbind()
    subscribers = []
  }

  let invalidate = isAll => {
    lastResult = EMPTY
    if (isAll) off()
  }

  let container = createContainer(depsWithNested, cb, emit, invalidate)

  return {
    deps: depsWithNested,
    _run(subscriber, fireImmediately) {
      subscribers.push(subscriber)

      if (lastResult === EMPTY) {
        lastResult = container.call()
      }

      if (fireImmediately) subscriber(lastResult)

      return () => {
        let index = subscribers.indexOf(subscriber)
        subscribers.splice(index, 1)
        if (!subscribers.length) {
          invalidate(true)
        }
      }
    },
    subscribe(subscriber) {
      return this._run(subscriber, true)
    },
    listen(subscriber) {
      return this._run(subscriber, false)
    },
    get() {
      return cb()
    },
    off
  }
}
