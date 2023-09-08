import React from "react"
import { CLEAR_EDITOR_COMMAND, LexicalEditor } from "lexical"
import { useTranslation } from "src/i18n"
import { Button } from "../../../ui/Button/Button"
import styles from "../../../ui/Modal/Modal.module.scss"

type ShowClearDialogProps = {
  editor: LexicalEditor
  onClose: () => void
}

export const ShowClearDialog = ({ editor, onClose }: ShowClearDialogProps) => {
  const { t: tCommon } = useTranslation("common")

  return (
    <>
      Are you sure you want to clear the editor?
      <div className={styles.modalContent}>
        <Button
          onClick={() => {
            editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined)
            editor.focus()
            onClose()
          }}
        >
          {tCommon("Clear")}
        </Button>{" "}
        <Button
          onClick={() => {
            editor.focus()
            onClose()
          }}
        >
          {tCommon("Cancel")}
        </Button>
      </div>
    </>
  )
}
