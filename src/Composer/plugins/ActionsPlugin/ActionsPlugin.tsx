/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useEffect, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { mergeRegister } from "@lexical/utils"
import { CONNECTED_COMMAND } from "@lexical/yjs"
import { $getRoot, $isParagraphNode, COMMAND_PRIORITY_EDITOR } from "lexical"
import { useModal } from "../../hooks/useModal"
import { Icon } from "../../ui/Icon/Icon"
import { validateEditorState } from "./ActionsPlugin.helpers"
import styles from "./ActionsPlugin.module.scss"
import { ShowClearDialog } from "./ShowClearDialog/ShowClearDialog"

export const ActionsPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const [isEditable, setIsEditable] = useState(() => editor.isEditable())
  const [isEditorEmpty, setIsEditorEmpty] = useState(true)
  const [modal, showModal] = useModal()

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable)
      }),
      editor.registerCommand<boolean>(
        CONNECTED_COMMAND,
        () => {
          return false
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    )
  }, [editor])

  useEffect(() => {
    return editor.registerUpdateListener(
      ({
        dirtyElements,
        // prevEditorState,
        tags,
      }) => {
        // If we are in read only mode, send the editor state
        // to server and ask for validation if possible.
        if (
          !isEditable &&
          dirtyElements.size > 0 &&
          !tags.has("historic") &&
          !tags.has("collaboration")
        ) {
          validateEditorState(editor)
        }
        editor.getEditorState().read(() => {
          const root = $getRoot()
          const children = root.getChildren()

          if (children.length > 1) {
            setIsEditorEmpty(false)
          } else {
            if ($isParagraphNode(children[0])) {
              const paragraphChildren = children[0].getChildren()
              setIsEditorEmpty(paragraphChildren.length === 0)
            } else {
              setIsEditorEmpty(false)
            }
          }
        })
      },
    )
  }, [editor, isEditable])

  return (
    <div className={styles.actions}>
      <button
        aria-label="Clear editor contents"
        className={styles.actionButton}
        disabled={isEditorEmpty}
        onClick={() => {
          showModal("Clear editor", (onClose) => (
            <ShowClearDialog editor={editor} onClose={onClose} />
          ))
        }}
        title="Clear"
      >
        <Icon type="clear" />
      </button>
      {modal}
    </div>
  )
}
