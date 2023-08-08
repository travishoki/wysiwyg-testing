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

function convertMergeFieldElement(domNode: Node): null | DOMConversionOutput {
  if (domNode instanceof HTMLImageElement) {
    const node = $createMergeFieldNode()
    return { node }
  }
  return null
}

export class MergeFieldNode extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return "merge-field"
  }

  static clone(): MergeFieldNode {
    return new MergeFieldNode()
  }

  static importDOM(): DOMConversionMap | null {
    return {
      span: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute("data-merge-field-component")) {
          return null
        }
        return {
          conversion: convertMergeFieldElement,
          priority: 1,
        }
      },
    }
  }

  createDOM(): HTMLElement {
    const element = document.createElement("div")
    element.className = "merge-field-component"
    return element
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("span")
    element.setAttribute("data-merge-field-component", "true")
    element.textContent = `{{hoki}}`
    return { element }
  }

  updateDOM(): false {
    return false
  }

  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <MergeFieldComponent nodeKey={this.getKey()} />
      </Suspense>
    )
  }
}

export function $createMergeFieldNode(): MergeFieldNode {
  return $applyNodeReplacement(new MergeFieldNode())
}

export function $isMergeFieldNode(node: LexicalNode | null | undefined): node is MergeFieldNode {
  return node instanceof MergeFieldNode
}
