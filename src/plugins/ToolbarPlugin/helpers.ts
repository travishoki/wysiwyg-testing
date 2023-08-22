import { CODE_LANGUAGE_FRIENDLY_NAME_MAP } from "@lexical/code"
import classNames from "classnames"
import styles from "./ToolbarPlugin.module.scss"

export const getCodeLanguageOptions = (): [string, string][] => {
  const options: [string, string][] = []

  for (const [lang, friendlyName] of Object.entries(CODE_LANGUAGE_FRIENDLY_NAME_MAP)) {
    options.push([lang, friendlyName])
  }

  return options
}

export const dropDownActiveClass = (active: boolean) => {
  if (active) return classNames("active", styles.dropdownItemActive)

  return ""
}
