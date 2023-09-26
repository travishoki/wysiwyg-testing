import React, { useEffect, useState } from "react"
import { INSERT_TABLE_COMMAND } from "@lexical/table"
import { LexicalEditor } from "lexical"
import { useTranslation } from "src/i18n"
import { Button } from "../../../ui/Button/Button"
import { DialogActions } from "../../../ui/Dialog/Dialog"
import { TextInput } from "../../../ui/TextInput/TextInput"

type InsertTableDialogProps = {
  activeEditor: LexicalEditor
  onClose: () => void
}

export const InsertTableDialog = ({ activeEditor, onClose }: InsertTableDialogProps) => {
  const [rows, setRows] = useState("5")
  const [columns, setColumns] = useState("5")
  const [isDisabled, setIsDisabled] = useState(true)

  const { t: tCommon } = useTranslation("common")

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
    activeEditor.dispatchCommand(INSERT_TABLE_COMMAND, {
      columns,
      rows,
    })

    onClose()
  }

  return (
    <>
      <TextInput
        data-test-id="table-modal-rows"
        label={tCommon("Rows")}
        onChange={setRows}
        placeholder="# of rows (1-500)"
        type="number"
        value={rows}
      />
      <TextInput
        data-test-id="table-modal-columns"
        label={tCommon("Columns")}
        onChange={setColumns}
        placeholder="# of columns (1-50)"
        type="number"
        value={columns}
      />
      <DialogActions data-test-id="table-model-confirm-insert">
        <Button disabled={isDisabled} onClick={onClick}>
          {tCommon("Confirm")}
        </Button>
      </DialogActions>
    </>
  )
}
