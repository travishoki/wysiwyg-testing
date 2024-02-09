import { HeadingTagType } from "@lexical/rich-text"
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

  if (format & IS_BOLD && text?.bold) classNames.push(text.bold)
  if (format & IS_CODE && text?.code) classNames.push(text.code)
  if (format & IS_HIGHLIGHT && text?.highlight) classNames.push(text.highlight)
  if (format & IS_ITALIC && text?.italic) classNames.push(text.italic)
  if (format & IS_STRIKETHROUGH && text?.strikethrough) classNames.push(text.strikethrough)
  if (format & IS_SUBSCRIPT && text?.subscript) classNames.push(text.subscript)
  if (format & IS_SUPERSCRIPT && text?.superscript) classNames.push(text.superscript)
  if (format & IS_UNDERLINE && text?.underline) classNames.push(text.underline)

  return classNames.join(" ")
}

export const wrapElementWith = (element: HTMLElement, tag: string) => {
  const el = document.createElement(tag)
  el.appendChild(element)

  return el
}

export const getHeadingClass = (tag: HeadingTagType | string): string => {
  const { heading } = ComposerTheme
  const classNames: string[] = []

  if (tag === "h1") classNames.push(heading.h1)
  if (tag === "h2") classNames.push(heading.h2)
  if (tag === "h3") classNames.push(heading.h3)

  return classNames.join(" ")
}
