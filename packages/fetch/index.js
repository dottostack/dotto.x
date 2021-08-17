import { effect, task } from 'dotto.x'
import originalFetch from 'cross-fetch'

export const fetch = async (deps, url, ...fetchParams) => {
  let result
  let unsub = effect(deps, () => {
    let controller = new AbortController()
    result = task(() =>
      originalFetch(url, { signal: controller.signal, ...fetchParams })
    )
    return () => {
      if (!controller.signal.aborted) controller.abort()
      unsub()
    }
  })

  result.finally(() => unsub())
  return result
}

export const fetchJson = async (deps, url, ...fetchParams) => {
  let result
  let unsub = effect(deps, () => {
    let controller = new AbortController()
    result = task(async () => {
      let res = await originalFetch(url, {
        signal: controller.signal,
        ...fetchParams
      })
      return res.json()
    })
    return () => {
      if (!controller.signal.aborted) controller.abort()
      unsub()
    }
  })

  result.finally(() => unsub())
  return result
}

// export const fetchJson = async (deps, url, ...fetchParams) => {
//   let fetchResult = await fetch(deps, url, ...fetchParams)
//   console.log('???')
//   return task(() => fetchResult.json())
// }
