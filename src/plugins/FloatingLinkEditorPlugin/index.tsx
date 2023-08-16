/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { $isAutoLinkNode, $isLinkNode } from "@lexical/link"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $findMatchingParent, mergeRegister } from "@lexical/utils"
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "lexical"
import { createPortal } from "react-dom"
import { getSelectedNode } from "../../utils/getSelectedNode"
import "./index.css"
import { FloatingLinkEditor } from "./FloatingLinkEditor"

const useFloatingLinkEditorToolbar = (
  editor: LexicalEditor,
  anchorElem: HTMLElement,
): JSX.Element | null => {
  const [activeEditor, setActiveEditor] = useState(editor)
  const [isLink, setIsLink] = useState(false)

  const updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const linkParent = $findMatchingParent(node, $isLinkNode)
      const autoLinkParent = $findMatchingParent(node, $isAutoLinkNode)

      // We don't want this menu to open for auto links.
      if (linkParent != null && autoLinkParent == null) {
        setIsLink(true)
      } else {
        setIsLink(false)
      }
    }
  }, [])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar()
        })
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, newEditor) => {
          updateToolbar()
          setActiveEditor(newEditor)
          return false
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    )
  }, [editor, updateToolbar])

  return createPortal(
    <FloatingLinkEditor
      editor={activeEditor}
      isLink={isLink}
      anchorElem={anchorElem}
      setIsLink={setIsLink}
    />,
    anchorElem,
  )
}

type FloatingLinkEditorPluginProps = {
  anchorElem?: HTMLElement
}

export const FloatingLinkEditorPlugin = ({
  anchorElem = document.body,
}: FloatingLinkEditorPluginProps): JSX.Element | null => {
  const [editor] = useLexicalComposerContext()
  return useFloatingLinkEditorToolbar(editor, anchorElem)
}
