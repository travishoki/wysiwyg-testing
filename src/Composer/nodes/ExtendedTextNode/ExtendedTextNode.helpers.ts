import { $isTextNode, DOMConversion, DOMConversionOutput } from "lexical"

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
