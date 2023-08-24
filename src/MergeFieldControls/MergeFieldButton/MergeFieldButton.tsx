import React, { useCallback } from "react"
import { MergeField } from "types"
import { ButtonWithIcon } from "../ButtonWithIcon/ButtonWithIcon"
import { formatMergeFieldTitle } from "./MergeFieldButton.helpers"

type MergeFieldButtonProps = {
  mergeField: MergeField
  onClick: (mergeField: MergeField) => void
}

export const MergeFieldButton = ({ mergeField, onClick }: MergeFieldButtonProps) => {
  const onClickButton = useCallback(() => {
    onClick(mergeField)
  }, [mergeField, onClick])

  const title = formatMergeFieldTitle(mergeField.name)

  return (
    <ButtonWithIcon
      // iconUrl={mergeField.iconUrl}
      onClick={onClickButton}
      title={title}
    />
  )
}
