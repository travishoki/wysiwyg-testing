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
  const { text } = ComposerTheme
  const classNames: string[] = []

  if (text) {
    if (format & IS_BOLD) classNames.push(text.bold)
    if (format & IS_CODE) classNames.push(text.code)
    if (format & IS_HIGHLIGHT) classNames.push(text.highlight)
    if (format & IS_ITALIC) classNames.push(text.italic)
    if (format & IS_STRIKETHROUGH) classNames.push(text.strikethrough)
    if (format & IS_SUBSCRIPT) classNames.push(text.subscript)
    if (format & IS_SUPERSCRIPT) classNames.push(text.superscript)
    if (format & IS_UNDERLINE) classNames.push(text.underline)
  }

  return classNames.join(" ")
}

export const wrapElementWith = (element: HTMLElement, tag: string) => {
  const el = document.createElement(tag)
  el.appendChild(element)

  return el
}
