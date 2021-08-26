import { createContainer } from './container'
import { readable } from './readable'

export const computed = cb => readable(cb, createContainer)
