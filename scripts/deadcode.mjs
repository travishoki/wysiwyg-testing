import chalk from "chalk"
import { log } from "console"
import lodash from "lodash"

import { organizeDeadCodeList, trimExecSync, spacer } from "./helpers.mjs"

const ignoredPaths = [".d.ts"]

log(chalk.bold.underline("Find Dead Code"))
log("Log a list of unused variables, functions, or types")

const cmd = `npx ts-prune --ignore "${ignoredPaths.join("|")}"`
const output = trimExecSync(cmd)

const outputArray = lodash.compact(output.split("\n"))

const noDeadCode = cmd === output || outputArray.length === 0

if (noDeadCode) {
  log(chalk.green("No Dead Code"))
} else {
  spacer()
  const deadCodeObj = organizeDeadCodeList(outputArray)

  if (deadCodeObj.default.length > 0) {
    log(`- Unused Default (${deadCodeObj.default.length}) -`)
    log(chalk.gray("The default export is not being imported anywhere in the code base"))
    deadCodeObj.default.forEach((str) => log(str))
    spacer()
  }

  if (deadCodeObj.other.length > 0) {
    log(`- Unused Code (${deadCodeObj.other.length}) -`)
    log(chalk.gray("The variable/function/type is not being used anywhere in the code base"))
    deadCodeObj.other.forEach((str) => log(str))
    spacer()
  }

  if (deadCodeObj.usedInModule.length > 0) {
    log(`- Only Used In Module (${deadCodeObj.usedInModule.length}) -`)
    log(
      chalk.gray(
        "The export is only being used within the files and not imported anywhere else in the code base",
      ),
    )
    deadCodeObj.usedInModule.forEach((str) => log(str))
    spacer()
  }
}
