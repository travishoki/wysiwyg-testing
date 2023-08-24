import React, { useCallback } from "react"
import { ButtonWithIcon } from "../ButtonWithIcon/ButtonWithIcon"
import { mergeFieldObject } from "../MergeFieldControls.const"
import { formatMergeFieldTitle } from "./MergeFieldButton.helpers"

type MergeFieldButtonProps = {
  mergeField: mergeFieldObject
  onClick: (mergeFieldObject: mergeFieldObject) => void
}

export const MergeFieldButton = ({ mergeField, onClick }: MergeFieldButtonProps) => {
  const onClickButton = useCallback(() => {
    onClick(mergeField)
  }, [mergeField, onClick])

  const title = formatMergeFieldTitle(mergeField.name)

  return <ButtonWithIcon iconUrl={mergeField.iconUrl} onClick={onClickButton} title={title} />
}
