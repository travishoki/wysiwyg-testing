/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useCallback, useEffect, useState } from "react"
import { $createCodeNode, $isCodeNode } from "@lexical/code"
import { $convertFromMarkdownString, $convertToMarkdownString } from "@lexical/markdown"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { mergeRegister } from "@lexical/utils"
import { CONNECTED_COMMAND } from "@lexical/yjs"
import {
  $createTextNode,
  $getRoot,
  $isParagraphNode,
  COMMAND_PRIORITY_EDITOR,
  LexicalEditor,
} from "lexical"
import { IconBare } from "../../Icon/IconBare"
import { useModal } from "../../hooks/useModal"
import { COMPOSER_TRANSFORMERS } from "../MarkdownTransformers"
import { ShowClearDialog } from "./ShowClearDialog/ShowClearDialog"
import styles from "./index.module.scss"

const validateEditorState = async (editor: LexicalEditor): Promise<void> => {
  const stringifiedEditorState = JSON.stringify(editor.getEditorState())
  let response = null
  try {
    response = await fetch("http://localhost:1235/validateEditorState", {
      body: stringifiedEditorState,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      method: "POST",
    })
  } catch {
    // NO-OP
  }
  if (response !== null && response.status === 403) {
    throw new Error("Editor state validation failed! Server did not accept changes.")
  }
}

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

  const handleMarkdownToggle = useCallback(() => {
    editor.update(() => {
      const root = $getRoot()
      const firstChild = root.getFirstChild()
      if ($isCodeNode(firstChild) && firstChild.getLanguage() === "markdown") {
        $convertFromMarkdownString(firstChild.getTextContent(), COMPOSER_TRANSFORMERS)
      } else {
        const markdown = $convertToMarkdownString(COMPOSER_TRANSFORMERS)
        root.clear().append($createCodeNode("markdown").append($createTextNode(markdown)))
      }
      root.selectEnd()
    })
  }, [editor])

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
        <IconBare type="clear" />
      </button>
      <button
        aria-label="Convert from markdown"
        className={styles.actionButton}
        onClick={handleMarkdownToggle}
        title="Convert From Markdown"
      >
        <IconBare type="markdown" />
      </button>
      {modal}
    </div>
  )
}
