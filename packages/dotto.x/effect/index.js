import { onOff } from '../lifecycle'
import { run_all } from '../utils/run_all'

export const effect = (deps, cb) => {
  if (!Array.isArray(deps)) deps = [deps]
  let endEffect = cb()
  let unbind = deps.reduce((unbinds, dep) => {
    let handle = () => {
      if (endEffect) endEffect()
      run_all(unbind)
      if (cb) endEffect = cb()
    }
    if (dep._run) {
      unbinds.push(dep.listen(handle))
    } else {
      unbinds.push(onOff(dep, handle))
    }
    return unbinds
  }, [])
  return () => {
    run_all(unbind)
    cb = null
  }
}
