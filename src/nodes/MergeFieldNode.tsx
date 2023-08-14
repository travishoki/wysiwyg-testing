import * as React from "react"
import { Suspense } from "react"

import {
  $applyNodeReplacement,
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  DecoratorNode,
  LexicalNode,
} from "lexical"

const MergeFieldComponent = React.lazy(
  // @ts-ignore
  () => import("./MergeFieldComponent"),
)

export class MergeFieldNode extends DecoratorNode<JSX.Element> {
  mergeFieldIconUrl: string
  mergeFieldKey: string

  static getType(): string {
    return "merge-field"
  }

  static clone(node: MergeFieldNode): MergeFieldNode {
    return new MergeFieldNode(node.mergeFieldIconUrl, node.mergeFieldKey)
  }

  convertMergeFieldElement(domNode: Node): null | DOMConversionOutput {
    if (domNode instanceof HTMLElement) {
      const node = $createMergeFieldNode(this.mergeFieldIconUrl, this.mergeFieldKey)
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

  constructor(mergeFieldIconUrl: string, mergeFieldKey: string) {
    super()
    this.mergeFieldIconUrl = mergeFieldIconUrl
    this.mergeFieldKey = mergeFieldKey
  }

  createDOM(): HTMLElement {
    const element = document.createElement("div")
    element.className = "merge-field-component"
    return element
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("span")
    element.setAttribute("data-merge-field-component", "true")
    element.textContent = `{{${this.mergeFieldKey}}}`
    return { element }
  }

  updateDOM(): false {
    return false
  }

  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <MergeFieldComponent
          nodeKey={this.getKey()}
          mergeFieldIconUrl={this.mergeFieldIconUrl}
          mergeFieldKey={this.mergeFieldKey}
        />
      </Suspense>
    )
  }
}

export function $createMergeFieldNode(
  mergeFieldIconUrl: string,
  mergeFieldKey: string,
): MergeFieldNode {
  return $applyNodeReplacement(new MergeFieldNode(mergeFieldIconUrl, mergeFieldKey))
}

export function $isMergeFieldNode(node: LexicalNode | null | undefined): node is MergeFieldNode {
  return node instanceof MergeFieldNode
}
