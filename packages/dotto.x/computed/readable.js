import { decorate } from '../utils/decorate'
import { target } from './context'

const EMPTY = {}

export const readable = (cb, createContainer) => {
  let subscribers = []
  let lastResult = EMPTY

  let emit = () => {
    let newResult = container.call()
    lastResult = newResult
    subscribers.forEach(subscriber => subscriber(lastResult))
  }

  let off = () => {
    lastResult = EMPTY
    container.unbind()
    subscribers = []
  }

  let invalidate = isAll => {
    lastResult = EMPTY
    if (isAll) off()
  }

  let container = createContainer(cb, emit, invalidate)

  return {
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
    get(reactive) {
      if (reactive) return container.run ? container.run() : cb()
      let targetContainer = target()

      if (!targetContainer) return cb()

      return decorate(cb, () => {
        targetContainer.silent = true
        return () => (targetContainer.silent = false)
      })
    },
    off
  }
}
