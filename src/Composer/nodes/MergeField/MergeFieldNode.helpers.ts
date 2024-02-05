import { camelCase } from "lodash"
import { ComposerTheme } from "../../themes/ComposerTheme"
import {
  IS_BOLD,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_SUPERSCRIPT,
  IS_UNDERLINE,
} from "./const"

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

export const getFormatTypeClassStyle = (format: number): string => {
  switch (format) {
    case IS_BOLD:
      return ComposerTheme.text.bold
    case IS_ITALIC:
      return ComposerTheme.text.italic
    case IS_STRIKETHROUGH:
      return ComposerTheme.text.strikethrough
    case IS_SUBSCRIPT:
      return ComposerTheme.text.subscript
    case IS_SUPERSCRIPT:
      return ComposerTheme.text.superscript
    case IS_UNDERLINE:
      return ComposerTheme.text.underline
    default:
      return ""
  }
}

export const wrapElementWith = (element: HTMLElement, tag: string) => {
  const el = document.createElement(tag)
  el.appendChild(element)

  return el
}
