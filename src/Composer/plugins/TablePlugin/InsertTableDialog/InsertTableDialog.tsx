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

const MAX_COLUM = 50
const MAX_ROW = 500

const DEFAULT_COLUMN_COUNT = "5"
const DEFAULT_ROW_COUNT = "5"

export const InsertTableDialog = ({ activeEditor, onClose }: InsertTableDialogProps) => {
  const [rows, setRows] = useState(DEFAULT_ROW_COUNT)
  const [columns, setColumns] = useState(DEFAULT_COLUMN_COUNT)
  const [isDisabled, setIsDisabled] = useState(true)

  const { t: tCommon } = useTranslation("common")
  const { t } = useTranslation("scenes", { keyPrefix: "composer" })

  useEffect(() => {
    const row = Number(rows)
    const column = Number(columns)
    if (row && row > 0 && row <= MAX_ROW && column && column > 0 && column <= MAX_COLUM) {
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
        placeholder={t("# of rows (1-{{maxRow}})", { maxRow: MAX_ROW })}
        type="number"
        value={rows}
      />
      <TextInput
        data-test-id="table-modal-columns"
        label={tCommon("Columns")}
        onChange={setColumns}
        placeholder={t("# of columns (1-{{maxColumn}})", { maxColumn: MAX_COLUM })}
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
