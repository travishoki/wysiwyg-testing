import { TextFormatType } from "lexical"
import { camelCase } from "lodash"
import { ComposerTheme } from "../../themes/ComposerTheme"

export const camelCaseToKebab = (str: string) =>
  str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())

export const styleObjectToString = (styleObj: Record<string, string>) =>
  Object.entries(styleObj)
    .map(([key, value]) => `${camelCaseToKebab(key)}: ${value};`)
    .join(" ")

export const styleStringToObject = (styleStr: string) =>
  styleStr.split(";").reduce((collector: Record<string, string>, str) => {
    const rulePair = str.split(":")
    const key = camelCase(rulePair[0]?.trim())
    const value = rulePair[1]?.trim()

    if (value) {
      collector[key] = value
    }

    return collector
  }, {})

export const getFormatTypeClassStyle = (format: TextFormatType): string => {
  switch (format) {
    case "bold":
      return ComposerTheme.text.bold
    case "italic":
      return ComposerTheme.text.italic
    case "underline":
      return ComposerTheme.text.underline
    default:
      return ""
  }
}
