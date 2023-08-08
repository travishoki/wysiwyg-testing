import * as React from "react"
import { useCallback } from "react"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

import { INSERT_MERGE_FIELD_COMMAND } from "../../const"
import { ButtonWithIcon } from "../ButtonWithIcon/ButtonWithIcon"
import { formatMergeFieldTitle } from "./helpers"

export const MergeFieldButton = ({ mergeFieldIconUrl, mergeFieldKey }: MergeFieldButtonProps) => {
  const [editor] = useLexicalComposerContext()

  const onClick = useCallback(() => {
    const payload = { mergeFieldIconUrl, mergeFieldKey }
    editor.dispatchCommand(INSERT_MERGE_FIELD_COMMAND, payload)
  }, [editor, mergeFieldIconUrl, mergeFieldKey])

  const title = formatMergeFieldTitle(mergeFieldKey)

  return <ButtonWithIcon iconUrl={mergeFieldIconUrl} onClick={onClick} title={title} />
}

type MergeFieldButtonProps = {
  mergeFieldIconUrl: string
  mergeFieldKey: string
}
