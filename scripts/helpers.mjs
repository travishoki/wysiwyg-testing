import { execSync } from "child_process"

export const log = console.log

export const spacer = () => {
  log("")
}

export const trimExecSync = (cmd) => {
  return execSync(cmd).toString().trim()
}

export const organizeDeadCodeList = (list) => {
  const obj = {
    default: [],
    usedInModule: [],
    other: [],
  }

  const useInModuleStr = " (used in module)"
  const defaultStr = " - default"

  list.forEach((str) => {
    if (str.includes(useInModuleStr)) {
      const thing = str.split(useInModuleStr)[0]
      obj.usedInModule.push(thing)
    } else if (str.includes(defaultStr)) {
      const thing = str.split(defaultStr)[0]
      obj.default.push(thing)
    } else {
      obj.other.push(str)
    }
  })

  return obj
}

// module.exports = {
//   log,
//   organizeDeadCodeList,
//   spacer,
//   trimExecSync,
// };
