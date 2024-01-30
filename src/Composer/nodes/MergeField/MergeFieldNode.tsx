import React, { Suspense } from "react"
import {
  $applyNodeReplacement,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  DecoratorNode,
  LexicalNode,
  SerializedLexicalNode,
  Spread,
} from "lexical"
import { camelCase } from "lodash"
import { ComposerNodeFallback } from "../../ui/ComposerNodeFallback/ComposerNodeFallback"
import { styleObjectToString } from "./MergeFieldNode.helpers"

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

  convertMergeFieldElement(domNode: Node): null | DOMConversionOutput {
    if (domNode instanceof HTMLElement) {
      const node = $createMergeFieldNode(this.mergeFieldId, this.mergeFieldName, this.style)

      return { node }
    }

    return null
  }

  importDOM(): DOMConversionMap | null {
    return {
      span: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute("data-merge-field-component")) {
          return null
        }

        return {
          conversion: this.convertMergeFieldElement,
          priority: 1,
        }
      },
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
      ...super.exportJSON(),
      mergeFieldId: this.getMergeFieldId(),
      mergeFieldName: this.getMergeFieldName(),
      style: this.getStyle(),
      type: "merge-field",
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

  getStyle(): Record<string, string> {
    const self = this.getLatest()

    return self.style
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
