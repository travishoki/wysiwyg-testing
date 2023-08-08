import * as React from "react"
import { useCallback } from "react"

import { ButtonWithIcon } from "../ButtonWithIcon/ButtonWithIcon"
import { formatMergeFieldTitle } from "./helpers"
import { mergeFieldObject } from "../const"

export const MergeFieldButton = ({
  mergeFieldIconUrl,
  mergeFieldKey,
  onClick,
}: MergeFieldButtonProps) => {
  const onClickButton = useCallback(() => {
    onClick({ iconUrl: mergeFieldIconUrl, key: mergeFieldKey })
  }, [mergeFieldIconUrl, mergeFieldKey, onClick])

  const title = formatMergeFieldTitle(mergeFieldKey)

  return <ButtonWithIcon iconUrl={mergeFieldIconUrl} onClick={onClickButton} title={title} />
}

type MergeFieldButtonProps = {
  mergeFieldIconUrl: string
  mergeFieldKey: string
  onClick: (mergeFieldObject: mergeFieldObject) => void
}
