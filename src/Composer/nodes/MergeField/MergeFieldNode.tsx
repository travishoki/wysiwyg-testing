import React, { Suspense } from "react"
import {
  $applyNodeReplacement,
  DOMConversionMap,
  DOMExportOutput,
  DecoratorNode,
  LexicalNode,
  SerializedLexicalNode,
  Spread,
  TextNode,
} from "lexical"
import { camelCase } from "lodash"
import { ComposerNodeFallback } from "../../ui/ComposerNodeFallback/ComposerNodeFallback"
import { patchStyleConversion, styleObjectToString } from "./MergeFieldNode.helpers"

const MergeFieldComponent = React.lazy(
  // @ts-ignore
  () => import("./MergeFieldComponent/MergeFieldComponent"),
)

type SerializedMergeFieldNode = Spread<
  {
    mergeFieldId: ID
    mergeFieldName: string
    style: Record<string, string>
  },
  SerializedLexicalNode
>

export class MergeFieldNode extends DecoratorNode<JSX.Element> {
  mergeFieldId: ID

  mergeFieldName: string

  style: Record<string, string>

  static getType(): string {
    return "merge-field"
  }

  static clone(node: MergeFieldNode): MergeFieldNode {
    return new MergeFieldNode(node.mergeFieldId, node.mergeFieldName, node.style)
  }

  /* eslint-disable-next-line class-methods-use-this */
  static importDOM(): DOMConversionMap | null {
    const importers = TextNode.importDOM()

    return {
      ...importers,
      code: () => ({
        conversion: patchStyleConversion(importers?.code),
        priority: 1,
      }),
      div: () => ({
        conversion: patchStyleConversion(importers?.div),
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

  constructor(mergeFieldId: ID, mergeFieldName: string, style: Record<string, string>) {
    super()
    this.mergeFieldId = mergeFieldId
    this.mergeFieldName = mergeFieldName
    this.style = style
  }

  /* eslint-disable-next-line class-methods-use-this */
  createDOM(): HTMLElement {
    const element = document.createElement("span")
    element.className = "merge-field"

    return element
  }

  static importJSON(serializedNode: SerializedMergeFieldNode): MergeFieldNode {
    const node = $createMergeFieldNode(
      serializedNode.mergeFieldId,
      serializedNode.mergeFieldName,
      serializedNode.style,
    )

    return node
  }

  exportJSON(): SerializedMergeFieldNode {
    return {
      mergeFieldId: this.getMergeFieldId(),
      mergeFieldName: this.getMergeFieldName(),
      style: this.getStyle(),
      type: "merge-field",
      version: 1,
    }
  }

  getMergeFieldId(): string {
    const self = this.getLatest()

    return self.mergeFieldId
  }

  getMergeFieldName(): string {
    const self = this.getLatest()

    return self.mergeFieldName
  }

  getStyle(): Record<string, string> {
    const self = this.getLatest()

    return self.style
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("span")
    element.className = "merge-field"
    element.textContent = `{{${this.mergeFieldId}}}`

    const style = styleObjectToString(this.style)

    if (style !== "") {
      element.setAttribute("style", style)
    }

    return { element }
  }

  /* eslint-disable-next-line class-methods-use-this */
  updateDOM(): false {
    return false
  }

  public setStyle(styleName: string, option: string) {
    const writable = this.getWritable()

    writable.style = {
      [camelCase(styleName)]: option,
    }
  }

  decorate() {
    return (
      <Suspense fallback={<ComposerNodeFallback />}>
        <MergeFieldComponent
          mergeFieldName={this.mergeFieldName}
          nodeKey={this.getKey()}
          style={this.style}
        />
      </Suspense>
    )
  }
}

export const $isMergeFieldNode = (node: LexicalNode | null | undefined): node is MergeFieldNode => {
  return node instanceof MergeFieldNode
}

export const $createMergeFieldNode = (
  mergeFieldId: ID,
  mergeFieldName: string,
  style: Record<string, string>,
): MergeFieldNode => {
  return $applyNodeReplacement(new MergeFieldNode(mergeFieldId, mergeFieldName, style))
}
