import { camelCase } from "lodash"

export const camelCaseToKebab = (str: string) =>
  str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())

export const styleObjectToString = (styleObj: Record<string, string>) =>
  Object.entries(styleObj)
    .map(([key, value]) => `${camelCaseToKebab(key)}: ${value};`)
    .join(" ")

export const styleStringToObject = (styleStr: string) => {
  const regex = /([\w-]*)\s*:\s*([^;]*)/g
  let match
  const properties: Record<string, string> = {}

  while ((match = regex.exec(styleStr))) {
    const key = camelCase(match[1])
    const value = match[2].trim()
    properties[key] = value
  }

  return properties
}
