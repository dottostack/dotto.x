import { run_all } from '../utils/run_all'

let tasks = 0
let resolves = []

export function startTask() {
  tasks++
  return () => {
    tasks--
    if (tasks === 0) {
      run_all(resolves)
      resolves = []
    }
  }
}

export function task(cb) {
  let endtask = startTask()
  return cb().finally(endtask)
}

export function allTasks() {
  if (tasks === 0) {
    return Promise.resolve()
  } else {
    return new Promise(resolve => {
      resolves.push(resolve)
    })
  }
}

export function clearTasks() {
  tasks = 0
}
