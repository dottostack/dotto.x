import { createContext, useContext, createElement } from 'react'

import { useState2e as useState } from '../index'

export const Context = createContext({})

export const State2eProvider = ({ state, children }) => {
  const liveState = useState(state)
  return createElement(Context.Provider, { value: liveState }, children)
}

export const useState2e = () => {
  return useContext(Context)
}
