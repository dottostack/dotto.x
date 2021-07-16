import { createContext, useContext, createElement } from 'react'

import { useMutableState2e as useState } from '../index'

export const MutableContext = createContext({})

export const MutableState2eProvider = ({ state, children }) => {
  const liveState = useState(state)
  return createElement(MutableContext.Provider, { value: liveState }, children)
}

export const useMutableState2e = () => {
  return useContext(MutableContext)
}
