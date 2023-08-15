import * as React from "react"
import { useEffect, useState } from "react"
import { LexicalEditor } from "lexical"
import { Button } from "../../ui/Button/Button"
import { DialogActions } from "../../ui/Dialog/Dialog"
import { TextInput } from "../../ui/TextInput/TextInput"
import { INSERT_NEW_TABLE_COMMAND } from "./const"

type InsertNewTableDialogProps = {
  activeEditor: LexicalEditor
  onClose: () => void
}

export function InsertNewTableDialog({
  activeEditor,
  onClose,
}: InsertNewTableDialogProps): JSX.Element {
  const [rows, setRows] = useState("")
  const [columns, setColumns] = useState("")
  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    const row = Number(rows)
    const column = Number(columns)
    if (row && row > 0 && row <= 500 && column && column > 0 && column <= 50) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [rows, columns])

  const onClick = () => {
    activeEditor.dispatchCommand(INSERT_NEW_TABLE_COMMAND, { columns, rows })
    onClose()
  }

  return (
    <>
      <TextInput
        placeholder={"# of rows (1-500)"}
        label="Rows"
        onChange={setRows}
        value={rows}
        data-test-id="table-modal-rows"
        type="number"
      />
      <TextInput
        placeholder={"# of columns (1-50)"}
        label="Columns"
        onChange={setColumns}
        value={columns}
        data-test-id="table-modal-columns"
        type="number"
      />
      <DialogActions data-test-id="table-model-confirm-insert">
        <Button disabled={isDisabled} onClick={onClick}>
          Confirm
        </Button>
      </DialogActions>
    </>
  )
}
