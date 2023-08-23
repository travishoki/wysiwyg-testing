import React, { Suspense } from "react"
import {
  $applyNodeReplacement,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  DecoratorNode,
  LexicalNode,
} from "lexical"
import { ComposerNodeFallback } from "../../ui/ComposerNodeFallback/ComposerNodeFallback"

const MergeFieldComponent = React.lazy(
  // @ts-ignore
  () => import("./MergeFieldComponent/MergeFieldComponent"),
)

export class MergeFieldNode extends DecoratorNode<JSX.Element> {
  mergeFieldIconUrl: string

  mergeFieldId: string

  static getType(): string {
    return "merge-field"
  }

  static clone(node: MergeFieldNode): MergeFieldNode {
    return new MergeFieldNode(node.mergeFieldIconUrl, node.mergeFieldId)
  }

  convertMergeFieldElement(domNode: Node): null | DOMConversionOutput {
    if (domNode instanceof HTMLElement) {
      const node = $createMergeFieldNode(this.mergeFieldIconUrl, this.mergeFieldId)

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

  constructor(mergeFieldIconUrl: string, mergeFieldId: string) {
    super()
    this.mergeFieldIconUrl = mergeFieldIconUrl
    this.mergeFieldId = mergeFieldId
  }

  createDOM(): HTMLElement {
    const element = document.createElement("span")

    return element
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("span")
    element.setAttribute("data-merge-field-component", "true")
    element.textContent = `{{${this.mergeFieldId}}}`

    return { element }
  }

  updateDOM(): false {
    return false
  }

  decorate() {
    return (
      <Suspense fallback={<ComposerNodeFallback />}>
        <MergeFieldComponent
          mergeFieldIconUrl={this.mergeFieldIconUrl}
          mergeFieldId={this.mergeFieldId}
          nodeKey={this.getKey()}
        />
      </Suspense>
    )
  }
}

export const $createMergeFieldNode = (
  mergeFieldIconUrl: string,
  mergeFieldId: string,
): MergeFieldNode => {
  return $applyNodeReplacement(new MergeFieldNode(mergeFieldIconUrl, mergeFieldId))
}

export const $isMergeFieldNode = (node: LexicalNode | null | undefined): node is MergeFieldNode => {
  return node instanceof MergeFieldNode
}
