/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { LexicalEditor, TextNode } from "lexical"
import { EmojiNode } from "../../nodes/Emoji/EmojiNode"
import { findAndTransformEmoji } from "./EmojisPlugin.helpers"

const textNodeTransform = (node: TextNode): void => {
  let targetNode: TextNode | null = node

  while (targetNode !== null) {
    if (!targetNode.isSimpleText()) {
      return
    }

    targetNode = findAndTransformEmoji(targetNode)
  }
}

const useEmojis = (editor: LexicalEditor): void => {
  useEffect(() => {
    if (!editor.hasNodes([EmojiNode])) {
      throw new Error("EmojisPlugin: EmojiNode not registered on editor")
    }

    return editor.registerNodeTransform(TextNode, textNodeTransform)
  }, [editor])
}

export const EmojisPlugin = (): JSX.Element | null => {
  const [editor] = useLexicalComposerContext()
  useEmojis(editor)

  return null
}
