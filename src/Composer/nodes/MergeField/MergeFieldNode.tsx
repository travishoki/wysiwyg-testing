import React, { Suspense } from "react"
import {
  $applyNodeReplacement,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  DecoratorNode,
} from "lexical"
import { ComposerNodeFallback } from "../../ui/ComposerNodeFallback/ComposerNodeFallback"

const MergeFieldComponent = React.lazy(
  // @ts-ignore
  () => import("./MergeFieldComponent/MergeFieldComponent"),
)

export class MergeFieldNode extends DecoratorNode<JSX.Element> {
  mergeFieldName: string

  static getType(): string {
    return "merge-field"
  }

  static clone(node: MergeFieldNode): MergeFieldNode {
    return new MergeFieldNode(node.mergeFieldName)
  }

  convertMergeFieldElement(domNode: Node): null | DOMConversionOutput {
    if (domNode instanceof HTMLElement) {
      const node = $createMergeFieldNode(this.mergeFieldName)

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

  constructor(mergeFieldName: string) {
    super()
    this.mergeFieldName = mergeFieldName
  }

  /* eslint-disable-next-line class-methods-use-this */
  createDOM(): HTMLElement {
    const element = document.createElement("span")
    element.className = "merge-field"

    return element
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("span")
    element.setAttribute("data-merge-field-component", "true")
    element.className = "merge-field"
    element.textContent = `{{${this.mergeFieldName}}}`

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

export const $createMergeFieldNode = (mergeFieldName: string): MergeFieldNode => {
  return $applyNodeReplacement(new MergeFieldNode(mergeFieldName))
}
