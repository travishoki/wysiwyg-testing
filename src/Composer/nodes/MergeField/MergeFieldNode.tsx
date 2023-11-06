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
import { ComposerNodeFallback } from "../../ui/ComposerNodeFallback/ComposerNodeFallback"

const MergeFieldComponent = React.lazy(
  // @ts-ignore
  () => import("./MergeFieldComponent/MergeFieldComponent"),
)

type SerializedMergeFieldNode = Spread<
  {
    mergeFieldId: ID
    mergeFieldName: string
  },
  SerializedLexicalNode
>

export class MergeFieldNode extends DecoratorNode<JSX.Element> {
  mergeFieldId: ID

  mergeFieldName: string

  static getType(): string {
    return "merge-field"
  }

  static clone(node: MergeFieldNode): MergeFieldNode {
    return new MergeFieldNode(node.mergeFieldId, node.mergeFieldName)
  }

  convertMergeFieldElement(domNode: Node): null | DOMConversionOutput {
    if (domNode instanceof HTMLElement) {
      const node = $createMergeFieldNode(this.mergeFieldId, this.mergeFieldName)

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

  constructor(mergeFieldId: ID, mergeFieldName: string) {
    super()
    this.mergeFieldId = mergeFieldId
    this.mergeFieldName = mergeFieldName
  }

  /* eslint-disable-next-line class-methods-use-this */
  createDOM(): HTMLElement {
    const element = document.createElement("span")
    element.className = "merge-field"

    return element
  }

  static importJSON(serializedNode: SerializedMergeFieldNode): MergeFieldNode {
    const node = $createMergeFieldNode(serializedNode.mergeFieldId, serializedNode.mergeFieldName)

    return node
  }

  exportJSON(): SerializedMergeFieldNode {
    return {
      ...super.exportJSON(),
      mergeFieldId: this.getMergeFieldId(),
      mergeFieldName: this.getMergeFieldName(),
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

    return { element }
  }

  /* eslint-disable-next-line class-methods-use-this */
  updateDOM(): false {
    return false
  }

  decorate() {
    return (
      <Suspense fallback={<ComposerNodeFallback />}>
        <MergeFieldComponent mergeFieldName={this.mergeFieldName} nodeKey={this.getKey()} />
      </Suspense>
    )
  }
}

export const $isMergeFieldNode = (node: LexicalNode | null | undefined): node is MergeFieldNode => {
  return node instanceof MergeFieldNode
}

export const $createMergeFieldNode = (mergeFieldId: ID, mergeFieldName: string): MergeFieldNode => {
  return $applyNodeReplacement(new MergeFieldNode(mergeFieldId, mergeFieldName))
}
