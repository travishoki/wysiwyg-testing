import { DOMConversionMap, SerializedTextNode, TextNode } from "lexical"
import { patchStyleConversion } from "./ExtendedTextNode.helpers"

export class ExtendedTextNode extends TextNode {
  static getType(): string {
    return "extended-text"
  }

  static clone(node: ExtendedTextNode): ExtendedTextNode {
    return new ExtendedTextNode(node.__text, node.__key)
  }

  static importDOM(): DOMConversionMap | null {
    const importers = TextNode.importDOM()

    return {
      ...importers,
      code: () => ({
        conversion: patchStyleConversion(importers?.code),
        priority: 1,
      }),
      em: () => ({
        conversion: patchStyleConversion(importers?.em),
        priority: 1,
      }),
      span: () => ({
        conversion: patchStyleConversion(importers?.span),
        priority: 1,
      }),
      strong: () => ({
        conversion: patchStyleConversion(importers?.strong),
        priority: 1,
      }),
      sub: () => ({
        conversion: patchStyleConversion(importers?.sub),
        priority: 1,
      }),
      sup: () => ({
        conversion: patchStyleConversion(importers?.sup),
        priority: 1,
      }),
    }
  }

  static importJSON(serializedNode: SerializedTextNode): TextNode {
    return TextNode.importJSON(serializedNode)
  }

  isSimpleText() {
    return (this.__type === "text" || this.__type === "extended-text") && this.__mode === 0
  }

  exportJSON(): SerializedTextNode {
    return {
      ...super.exportJSON(),
      type: "extended-text",
      version: 1,
    }
  }
}
