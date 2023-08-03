import * as React from "react"
import { useCallback } from "react"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

import { INSERT_HOKI_COMMAND } from "../../const"

export const HokiButton = () => {
  const [editor] = useLexicalComposerContext()

  const onClick = useCallback(() => {
    editor.dispatchCommand(INSERT_HOKI_COMMAND, undefined)
  }, [editor])

  return <button onClick={onClick}>Hoki</button>
}
