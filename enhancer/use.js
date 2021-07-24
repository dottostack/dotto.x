export const use = (store, ...enhancers) => {
  const toUnbinds = enhancers
    .reduce((unbind, enhance) => {
      unbind.push(enhance(store))
      return unbind
    }, [])
    .reverse()
  return () => toUnbinds.forEach(unbind => unbind())
}
