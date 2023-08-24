import React, { useCallback } from "react"
import { ButtonWithIcon } from "../ButtonWithIcon/ButtonWithIcon"
import { MergeField } from "../MergeFieldControls.const"
import { formatMergeFieldTitle } from "./MergeFieldButton.helpers"

type MergeFieldButtonProps = {
  mergeField: MergeField
  onClick: (mergeFieldObject: MergeField) => void
}

export const MergeFieldButton = ({ mergeField, onClick }: MergeFieldButtonProps) => {
  const onClickButton = useCallback(() => {
    onClick(mergeField)
  }, [mergeField, onClick])

  const title = formatMergeFieldTitle(mergeField.name)

  return <ButtonWithIcon iconUrl={mergeField.iconUrl} onClick={onClickButton} title={title} />
}
