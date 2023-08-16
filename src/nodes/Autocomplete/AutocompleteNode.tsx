/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react"
import { DecoratorNode, EditorConfig, NodeKey, SerializedLexicalNode, Spread } from "lexical"
import { useSharedAutocompleteContext } from "../../context/SharedAutocompleteContext"
import { uuid as UUID } from "../../plugins/AutocompletePlugin"

declare global {
  interface Navigator {
    userAgentData?: {
      mobile: boolean
    }
  }
}

type SerializedAutocompleteNode = Spread<
  {
    uuid: string
  },
  SerializedLexicalNode
>

export class AutocompleteNode extends DecoratorNode<JSX.Element | null> {
  // TODO add comment
  __uuid: string

  static clone(node: AutocompleteNode): AutocompleteNode {
    return new AutocompleteNode(node.__uuid, node.__key)
  }

  static getType(): "autocomplete" {
    return "autocomplete"
  }

  static importJSON(serializedNode: SerializedAutocompleteNode): AutocompleteNode {
    const node = $createAutocompleteNode(serializedNode.uuid)
    return node
  }

  exportJSON(): SerializedAutocompleteNode {
    return {
      ...super.exportJSON(),
      type: "autocomplete",
      uuid: this.__uuid,
      version: 1,
    }
  }

  constructor(uuid: string, key?: NodeKey) {
    super(key)
    this.__uuid = uuid
  }

  updateDOM(_prevNode: unknown, _dom: HTMLElement, _config: EditorConfig): boolean {
    return false
  }

  createDOM(_config: EditorConfig): HTMLElement {
    return document.createElement("span")
  }

  decorate(): JSX.Element | null {
    if (this.__uuid !== UUID) {
      return null
    }
    return <AutocompleteComponent />
  }
}

export const $createAutocompleteNode = (uuid: string): AutocompleteNode => {
  return new AutocompleteNode(uuid)
}

const AutocompleteComponent = () => {
  const [suggestion] = useSharedAutocompleteContext()
  const userAgentData = window.navigator.userAgentData
  const isMobile =
    userAgentData !== undefined
      ? userAgentData.mobile
      : window.innerWidth <= 800 && window.innerHeight <= 600
  // TODO Move to theme
  return (
    <span style={{ color: "#ccc" }} spellCheck="false">
      {suggestion} {isMobile ? "(SWIPE \u2B95)" : "(TAB)"}
    </span>
  )
}
