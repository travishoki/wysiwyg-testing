import { $isTextNode, DOMConversion, DOMConversionOutput } from "lexical"
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

export const patchStyleConversion = (
  originalDOMConverter?: (node: HTMLElement) => DOMConversion | null,
): ((node: HTMLElement) => DOMConversionOutput | null) => {
  return (node) => {
    const original = originalDOMConverter?.(node)
    if (!original) {
      return null
    }
    const originalOutput = original.conversion(node)

    if (!originalOutput) {
      return originalOutput
    }

    const backgroundColor = node.style.backgroundColor
    const color = node.style.color
    const fontFamily = node.style.fontFamily
    const fontWeight = node.style.fontWeight
    const fontSize = node.style.fontSize
    const textDecoration = node.style.textDecoration

    return {
      ...originalOutput,
      forChild: (lexicalNode, parent) => {
        const originalForChild = originalOutput?.forChild ?? ((x) => x)
        const result = originalForChild(lexicalNode, parent)
        if ($isTextNode(result)) {
          const style = [
            backgroundColor ? `background-color: ${backgroundColor}` : null,
            color ? `color: ${color}` : null,
            fontFamily ? `font-family: ${fontFamily}` : null,
            fontWeight ? `font-weight: ${fontWeight}` : null,
            fontSize ? `font-size: ${fontSize}` : null,
            textDecoration ? `text-decoration: ${textDecoration}` : null,
          ]
            .filter((value) => value != null)
            .join("; ")
          if (style.length) {
            return result.setStyle(style)
          }
        }

        return result
      },
    }
  }
}
