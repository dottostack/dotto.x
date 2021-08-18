import { run_all } from '../utils/run_all'

let tasks = 0
let resolves = []

export function startTask() {
  tasks++
  return () => {
    tasks--
    if (!tasks) {
      run_all(resolves)
      resolves = []
    }
  }
}

export function task(cb) {
  let endtask = startTask()
  return cb().finally(endtask)
}

export const allTasks = () =>
  !tasks
    ? Promise.resolve()
    : new Promise(resolve => {
        resolves.push(resolve)
      })

export function clearTasks() {
  tasks = 0
}
