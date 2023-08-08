import * as React from "react"
import { useCallback } from "react"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

import { INSERT_MERGE_FIELD_COMMAND } from "../../const"
import { Button } from "../Button/Button"
import { formatTitle } from "./const"

export const MergeFieldButton = ({ mergeFieldItem }: MergeFieldButtonProps) => {
  const [editor] = useLexicalComposerContext()

  const onClick = useCallback(() => {
    editor.dispatchCommand(INSERT_MERGE_FIELD_COMMAND, undefined)
  }, [editor])

  const title = formatTitle(mergeFieldItem)

  return <Button onClick={onClick} title={title} />
}

type MergeFieldButtonProps = {
  mergeFieldItem: string
}
