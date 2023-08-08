import * as React from "react"
import { useCallback } from "react"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

import { INSERT_MERGE_FIELD_COMMAND } from "../../const"
import { Button } from "../Button/Button"

export const MergeFieldButton = () => {
  const [editor] = useLexicalComposerContext()

  const onClick = useCallback(() => {
    editor.dispatchCommand(INSERT_MERGE_FIELD_COMMAND, undefined)
  }, [editor])

  return <Button onClick={onClick} title="Hoki" />
}
