import * as React from "react"
import { Suspense } from "react"
import {
  $applyNodeReplacement,
  DOMConversionMap,
  DOMConversionOutput,
  DecoratorNode,
  LexicalNode,
} from "lexical"
import { DELETE_HOKI_COMMAND } from "../const"

const HokiComponent = React.lazy(
  // @ts-ignore
  () => import("./HokiComponent"),
)

function convertHokiElement(domNode: Node): null | DOMConversionOutput {
  if (domNode instanceof HTMLImageElement) {
    const node = $createHokiNode()
    return { node }
  }
  return null
}

export class HokiNode extends DecoratorNode<JSX.Element> {
  static getType(): string {
    return "hoki"
  }

  static clone(): HokiNode {
    return new HokiNode()
  }

  static importDOM(): DOMConversionMap | null {
    return {
      span: (domNode: HTMLElement) => {
        if (!domNode.hasAttribute("data-lexical-mention")) {
          return null
        }
        return {
          conversion: convertHokiElement,
          priority: 1,
        }
      },
    }
  }

  createDOM(): HTMLElement {
    const div = document.createElement("div")
    div.className = "hoki-component"
    return div
  }

  updateDOM(): false {
    return false
  }

  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <HokiComponent />
      </Suspense>
    )
  }
}

export function $createHokiNode(): HokiNode {
  return $applyNodeReplacement(new HokiNode())
}

export function $isHokiNodeNode(node: LexicalNode | null | undefined): node is HokiNode {
  return node instanceof HokiNode
}
