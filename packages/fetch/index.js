import { effect, task } from 'dotto.x'
import originalFetch from 'cross-fetch'

export const fetch = async (deps, url, init) => {
  let result
  let unsub = effect(deps, () => {
    let controller = new AbortController()
    result = task(() =>
      originalFetch(url, { signal: controller.signal, ...init })
    )
    return () => {
      if (!controller.signal.aborted) controller.abort()
      unsub()
    }
  })
  result.finally(() => unsub())
  return result
}

export const fetchJson = (deps, url, ...fetchParams) => {
  return task(async () => {
    let fetchResult = await fetch(deps, url, ...fetchParams)
    return fetchResult.json()
  })
}
