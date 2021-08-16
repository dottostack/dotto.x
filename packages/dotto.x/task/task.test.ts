import { allTasks, startTask, task } from './index'

it('waits no effects', async () => {
  await allTasks()
})

it('waits for nested effects', async () => {
  let track = ''

  async function effectA(): Promise<void> {
    let end = startTask()
    await Promise.resolve()
    effectB()
    track += 'a'
    end()
  }

  async function effectB(): Promise<void> {
    let result = await task(async () => {
      await Promise.resolve()
      track += 'b'
      return 5
    })
    expect(result).toEqual(5)
  }

  effectA()
  await allTasks()
  expect(track).toEqual('ab')
})

it('ends task on error', async () => {
  let error = Error('test')
  let cathed: Error | undefined
  try {
    await task(async () => {
      await Promise.resolve()
      throw error
    })
  } catch (e) {
    cathed = e
  }
  expect(cathed).toBe(error)
  await allTasks()
})
