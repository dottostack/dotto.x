import { createStore } from '../../../create-store'
import { useSelector } from './index'

const store = createStore({ some: 1 })
useSelector(store, 'some')
