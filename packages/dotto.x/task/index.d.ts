export function startTask(): () => void

export function task<Return = never>(
  cb: () => Promise<Return> | Return
): Promise<Return>

export function allTasks(): Promise<void>

export function clearTasks(): void
