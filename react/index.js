import { useCallback, useEffect, useState } from 'react'

export const useState2e = ({
  container,
  disconnect,
  connect,
  setState,
  name
}) => {
  const [, force] = useState({})
  const eh = useCallback(
    event => {
      if (event?.keysChanged.has(name)) force({})
    },
    [name]
  )
  useEffect(() => {
    container.observe(eh)
    connect()
    return () => {
      disconnect()
      container.unobserve(eh)
    }
  }, [container, disconnect, connect, name, eh])
  return [container.get(name), setState]
}

export const useMutableState2e = ({ container, disconnect, connect, name }) => {
  const [, force] = useState({})
  const eh = useCallback(
    events => {
      if (events.some(event => event?.keysChanged.has(name))) force({})
    },
    [name]
  )
  useEffect(() => {
    container.observeDeep(eh)
    connect()
    return () => {
      disconnect()
      container.unobserveDeep(eh)
    }
  }, [container, disconnect, connect, name, eh])
  return container.get(name)
}
