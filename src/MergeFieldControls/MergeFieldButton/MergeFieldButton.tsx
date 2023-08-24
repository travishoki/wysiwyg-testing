import React, { useCallback } from "react"
import { ButtonWithIcon } from "../ButtonWithIcon/ButtonWithIcon"
import { mergeFieldObject } from "../MergeFieldControls.const"
import { formatMergeFieldTitle } from "./MergeFieldButton.helpers"

type MergeFieldButtonProps = {
  mergeFieldIconUrl: string
  mergeFieldId: string
  mergeFieldName: string
  onClick: (mergeFieldObject: mergeFieldObject) => void
}

export const MergeFieldButton = ({
  mergeFieldIconUrl,
  mergeFieldId,
  mergeFieldName,
  onClick,
}: MergeFieldButtonProps) => {
  const onClickButton = useCallback(() => {
    onClick({ iconUrl: mergeFieldIconUrl, id: mergeFieldId, name: mergeFieldName })
  }, [mergeFieldIconUrl, mergeFieldId, mergeFieldName, onClick])

  const title = formatMergeFieldTitle(mergeFieldName)

  return <ButtonWithIcon iconUrl={mergeFieldIconUrl} onClick={onClickButton} title={title} />
}
