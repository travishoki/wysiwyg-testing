import * as React from "react"
import { useCallback } from "react"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

import { INSERT_MERGE_FIELD_COMMAND } from "../../const"
import { Button } from "../Button/Button"
import { formatTitle } from "./helpers"

export const MergeFieldButton = ({ mergeFieldKey }: MergeFieldButtonProps) => {
  const [editor] = useLexicalComposerContext()

  const onClick = useCallback(() => {
    editor.dispatchCommand(INSERT_MERGE_FIELD_COMMAND, undefined)
  }, [editor])

  const title = formatTitle(mergeFieldKey)

  return <Button onClick={onClick} title={title} />
}

type MergeFieldButtonProps = {
  mergeFieldKey: string
}
