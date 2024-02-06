import { camelCase } from "lodash"
import { ComposerTheme } from "../../themes/ComposerTheme"
import {
  IS_BOLD,
  IS_CODE,
  IS_HIGHLIGHT,
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

export const getFormatTypeClass = (format: number): string => {
  const classNames: string[] = []
  if (format & IS_BOLD) classNames.push(ComposerTheme.text.bold)
  if (format & IS_CODE) classNames.push(ComposerTheme.text.code)
  if (format & IS_HIGHLIGHT) classNames.push(ComposerTheme.text.highlight)
  if (format & IS_ITALIC) classNames.push(ComposerTheme.text.italic)
  if (format & IS_STRIKETHROUGH) classNames.push(ComposerTheme.text.strikethrough)
  if (format & IS_SUBSCRIPT) classNames.push(ComposerTheme.text.subscript)
  if (format & IS_SUPERSCRIPT) classNames.push(ComposerTheme.text.superscript)
  if (format & IS_UNDERLINE) classNames.push(ComposerTheme.text.underline)

  return classNames.join(" ")
}

export const wrapElementWith = (element: HTMLElement, tag: string) => {
  const el = document.createElement(tag)
  el.appendChild(element)

  return el
}
