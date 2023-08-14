import * as React from "react"
import { useCallback } from "react"

import { ButtonWithIcon } from "../ButtonWithIcon/ButtonWithIcon"
import { formatMergeFieldTitle } from "./helpers"
import { mergeFieldObject } from "../const"

export const MergeFieldButton = ({
  mergeFieldIconUrl,
  mergeFieldId,
  onClick,
}: MergeFieldButtonProps) => {
  const onClickButton = useCallback(() => {
    onClick({ iconUrl: mergeFieldIconUrl, id: mergeFieldId })
  }, [mergeFieldIconUrl, mergeFieldId, onClick])

  const title = formatMergeFieldTitle(mergeFieldId)

  return <ButtonWithIcon iconUrl={mergeFieldIconUrl} onClick={onClickButton} title={title} />
}

type MergeFieldButtonProps = {
  mergeFieldIconUrl: string
  mergeFieldId: string
  onClick: (mergeFieldObject: mergeFieldObject) => void
}
