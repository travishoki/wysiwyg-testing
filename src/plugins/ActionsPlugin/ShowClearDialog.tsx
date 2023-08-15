import * as React from "react"
import { CLEAR_EDITOR_COMMAND } from "lexical"
import { Button } from "../../ui/Button/Button"
import type { LexicalEditor } from "lexical"

type ShowClearDialogProps = {
  editor: LexicalEditor
  onClose: () => void
}

export function ShowClearDialog({ editor, onClose }: ShowClearDialogProps) {
  return (
    <>
      Are you sure you want to clear the editor?
      <div className="Modal__content">
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
