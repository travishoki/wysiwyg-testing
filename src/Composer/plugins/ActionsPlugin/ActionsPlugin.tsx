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
import { $getRoot, $isParagraphNode } from "lexical"
import { useTranslation } from "src/i18n"
import { useModal } from "../../hooks/useModal"
import { Icon } from "../../ui/Icon/Icon"
import styles from "./ActionsPlugin.module.scss"
import { ShowClearDialog } from "./ShowClearDialog/ShowClearDialog"

export const ActionsPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const [isEditable, setIsEditable] = useState(() => editor.isEditable())
  const [isEditorEmpty, setIsEditorEmpty] = useState(true)
  const [modal, showModal] = useModal()

  const { t } = useTranslation("scenes", { keyPrefix: "composer" })
  const { t: tCommon } = useTranslation("common")

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable)
      }),
    )
  }, [editor])

  useEffect(() => {
    return editor.registerUpdateListener(() => {
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
    })
  }, [editor, isEditable])

  return (
    <div className={styles.actions}>
      <button
        aria-label={t("Clear editor")}
        className={styles.actionButton}
        disabled={isEditorEmpty}
        onClick={() => {
          showModal(t("Clear editor"), (onClose) => (
            <ShowClearDialog editor={editor} onClose={onClose} />
          ))
        }}
        title={tCommon("Clear")}
      >
        <Icon type="clear" />
      </button>
      {modal}
    </div>
  )
}
