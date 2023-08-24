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

  mergeFieldName: string

  static getType(): string {
    return "merge-field"
  }

  static clone(node: MergeFieldNode): MergeFieldNode {
    return new MergeFieldNode(node.mergeFieldIconUrl, node.mergeFieldName)
  }

  convertMergeFieldElement(domNode: Node): null | DOMConversionOutput {
    if (domNode instanceof HTMLElement) {
      const node = $createMergeFieldNode(this.mergeFieldIconUrl, this.mergeFieldName)

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

  constructor(mergeFieldIconUrl: string, mergeFieldName: string) {
    super()
    this.mergeFieldIconUrl = mergeFieldIconUrl
    this.mergeFieldName = mergeFieldName
  }

  createDOM(): HTMLElement {
    const element = document.createElement("span")

    return element
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("span")
    element.setAttribute("data-merge-field-component", "true")
    element.textContent = `{{${this.mergeFieldName}}}`

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
          mergeFieldName={this.mergeFieldName}
          nodeKey={this.getKey()}
        />
      </Suspense>
    )
  }
}

export const $createMergeFieldNode = (
  mergeFieldIconUrl: string,
  mergeFieldName: string,
): MergeFieldNode => {
  return $applyNodeReplacement(new MergeFieldNode(mergeFieldIconUrl, mergeFieldName))
}

export const $isMergeFieldNode = (node: LexicalNode | null | undefined): node is MergeFieldNode => {
  return node instanceof MergeFieldNode
}
