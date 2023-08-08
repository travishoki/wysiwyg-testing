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
        if (!domNode.hasAttribute("data-hoki-component")) {
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
    const element = document.createElement("div")
    element.className = "hoki-component"
    return element
  }

  exportDOM(): DOMExportOutput {
    const element = document.createElement("span")
    element.setAttribute("data-hoki-component", "true")
    element.textContent = `{{hoki}}`
    return { element }
  }

  updateDOM(): false {
    return false
  }

  decorate(): JSX.Element {
    return (
      <Suspense fallback={null}>
        <HokiComponent nodeKey={this.getKey()} />
      </Suspense>
    )
  }
}

export function $createHokiNode(): HokiNode {
  return $applyNodeReplacement(new HokiNode())
}

export function $isHokiNode(node: LexicalNode | null | undefined): node is HokiNode {
  return node instanceof HokiNode
}
