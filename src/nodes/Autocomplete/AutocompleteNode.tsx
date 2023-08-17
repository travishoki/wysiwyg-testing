/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react"
import { DecoratorNode, EditorConfig, NodeKey, SerializedLexicalNode, Spread } from "lexical"
import { uuid as UUID } from "../../plugins/AutocompletePlugin"
import { AutocompleteComponent } from "./AutocompleteComponent"

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
