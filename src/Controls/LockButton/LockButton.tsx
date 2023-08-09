import React from "react"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

import { Button } from "../Button/Button"

export const LockButton = () => {
  const [editor] = useLexicalComposerContext()

  const onClick = () => {
    editor.update(() => {
      editor.setEditable(!editor.isEditable())
    })
  }

  return <Button onClick={onClick} title="Lock" />
}
