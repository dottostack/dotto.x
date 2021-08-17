import { createStore, allTasks } from 'dotto.x'

import { fetch, fetchJson } from './index'

describe('fetch', () => {
  it('all ok fetch', async () => {
    expect.assertions(1)
    let store = createStore({})
    fetch([store], 'https://api.aniapi.com/v1/anime/10').then((res: any) => {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(res.status).toBe(200)
    })

    await allTasks()
  })

  it('all ok fetchJson', async () => {
    expect.assertions(1)
    let store = createStore({})
    fetchJson([store], 'https://api.aniapi.com/v1/anime/10').then(
      (res: any) => {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(res.status_code).toBe(200)
      }
    )
    await allTasks()
  })

  it('abort req when store off', async () => {
    expect.assertions(1)
    let store = createStore({})
    fetchJson([store], 'https://api.aniapi.com/v1/anime/10').catch(
      (error: any) => {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(error).toEqual({
          type: 'aborted',
          message: 'The user aborted a request.'
        })
      }
    )

    store.off()

    await allTasks()
  })
})
