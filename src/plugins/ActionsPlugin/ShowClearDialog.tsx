import React from "react"
import { CLEAR_EDITOR_COMMAND, LexicalEditor } from "lexical"
import { Button } from "../../ui/Button/Button"
import styles from "../../ui/Modal/Modal.module.scss"

type ShowClearDialogProps = {
  editor: LexicalEditor
  onClose: () => void
}

export const ShowClearDialog = ({ editor, onClose }: ShowClearDialogProps) => {
  return (
    <>
      Are you sure you want to clear the editor?
      <div className={styles["Modal__content"]}>
        <Button
          onClick={() => {
            editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined)
            editor.focus()
            onClose()
          }}
        >
          Clear
        </Button>{" "}
        <Button
          onClick={() => {
            editor.focus()
            onClose()
          }}
        >
          Cancel
        </Button>
      </div>
    </>
  )
}
