/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { EditorConfig, SerializedTextNode, TextNode } from "lexical"

type SerializedKeywordNode = SerializedTextNode

export class KeywordNode extends TextNode {
  static getType(): string {
    return "keyword"
  }

  static clone(node: KeywordNode): KeywordNode {
    return new KeywordNode(node.__text, node.__key)
  }

  static importJSON(serializedNode: SerializedKeywordNode): KeywordNode {
    const node = $createKeywordNode(serializedNode.text)
    node.setFormat(serializedNode.format)
    node.setDetail(serializedNode.detail)
    node.setMode(serializedNode.mode)
    node.setStyle(serializedNode.style)

    return node
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config)
    dom.style.cursor = "default"
    dom.className = "keyword"

    return dom
  }

  /* eslint-disable-next-line class-methods-use-this */
  canInsertTextBefore(): boolean {
    return false
  }

  /* eslint-disable-next-line class-methods-use-this */
  canInsertTextAfter(): boolean {
    return false
  }

  /* eslint-disable-next-line class-methods-use-this */
  isTextEntity(): true {
    return true
  }
}

export const $createKeywordNode = (keyword: string): KeywordNode => {
  return new KeywordNode(keyword)
}
