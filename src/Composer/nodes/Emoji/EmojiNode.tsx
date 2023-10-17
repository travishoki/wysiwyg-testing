/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  $applyNodeReplacement,
  EditorConfig,
  NodeKey,
  SerializedTextNode,
  Spread,
  TextNode,
} from "lexical"

type SerializedEmojiNode = Spread<
  {
    className: string
  },
  SerializedTextNode
>

export class EmojiNode extends TextNode {
  __className: string

  static getType(): string {
    return "emoji"
  }

  static clone(node: EmojiNode): EmojiNode {
    return new EmojiNode(node.__className, node.__text, node.__key)
  }

  constructor(className: string, text: string, key?: NodeKey) {
    super(text, key)
    this.__className = className
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = document.createElement("span")
    const inner = super.createDOM(config)
    dom.className = this.__className
    inner.className = "composer__emojiInner"
    dom.appendChild(inner)

    return dom
  }

  updateDOM(prevNode: TextNode, dom: HTMLElement, config: EditorConfig): boolean {
    const inner = dom.firstChild
    if (inner === null) {
      return true
    }
    super.updateDOM(prevNode, inner as HTMLElement, config)

    return false
  }

  static importJSON(serializedNode: SerializedEmojiNode): EmojiNode {
    const node = $createEmojiNode(serializedNode.className, serializedNode.text)
    node.setFormat(serializedNode.format)
    node.setDetail(serializedNode.detail)
    node.setMode(serializedNode.mode)
    node.setStyle(serializedNode.style)

    return node
  }

  getClassName(): string {
    const self = this.getLatest()

    return self.__className
  }
}

export const $createEmojiNode = (className: string, emojiText: string): EmojiNode => {
  const node = new EmojiNode(className, emojiText).setMode("token")

  return $applyNodeReplacement(node)
}
