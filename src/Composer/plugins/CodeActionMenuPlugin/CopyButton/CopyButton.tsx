/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useState } from "react"
import { $isCodeNode } from "@lexical/code"
import { $getNearestNodeFromDOMNode, $getSelection, $setSelection, LexicalEditor } from "lexical"
import { IconButton } from "../../ToolbarPlugin/IconButton/IconButton"
import stylesCodeActionMenu from "../CodeActionMenuContainer/CodeActionMenuContainer.module.scss"
import { useDebounce } from "../hooks"

interface CopyButtonProps {
  editor: LexicalEditor
  getCodeDOMNode: () => HTMLElement | null
}

export const CopyButton = ({ editor, getCodeDOMNode }: CopyButtonProps) => {
  const [isCopyCompleted, setCopyCompleted] = useState<boolean>(false)

  const removeSuccessIcon = useDebounce(() => {
    setCopyCompleted(false)
  }, 1000)

  const handleClick = async (): Promise<void> => {
    const codeDOMNode = getCodeDOMNode()

    if (!codeDOMNode) {
      return
    }

    let content = ""

    editor.update(() => {
      const codeNode = $getNearestNodeFromDOMNode(codeDOMNode)

      if ($isCodeNode(codeNode)) {
        content = codeNode.getTextContent()
      }

      const selection = $getSelection()
      $setSelection(selection)
    })

    try {
      await navigator.clipboard.writeText(content)
      setCopyCompleted(true)
      removeSuccessIcon()
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <button aria-label="copy" className={stylesCodeActionMenu.menuItem} onClick={handleClick}>
      {isCopyCompleted ? <IconButton type="success" /> : <IconButton type="copy" />}
    </button>
  )
}
