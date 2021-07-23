import { createStore } from '../../create-store'
import { useSelector } from './index'

const store = createStore('test', { some: 1 })
useSelector(store, 'some')
