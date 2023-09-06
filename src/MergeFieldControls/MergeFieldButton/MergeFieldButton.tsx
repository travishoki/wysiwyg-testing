import React, { useCallback } from "react"
import { MergeField } from "types"
import { formatMergeFieldTitle } from "../../Composer/helpers/mergeFields.helpers"
import { ButtonWithIcon } from "../ButtonWithIcon/ButtonWithIcon"

type MergeFieldButtonProps = {
  mergeField: MergeField
  onClick: (mergeField: MergeField) => void
}

export const MergeFieldButton = ({ mergeField, onClick }: MergeFieldButtonProps) => {
  const onClickButton = useCallback(() => {
    onClick(mergeField)
  }, [mergeField, onClick])

  const title = formatMergeFieldTitle(mergeField.name)

  return <ButtonWithIcon onClick={onClickButton} title={title} />
}
