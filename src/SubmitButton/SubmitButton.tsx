import React from "react"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $generateHtmlFromNodes } from "@lexical/html"

export const SubmitButton = ({ onSubmit }: SubmitButtonProps) => {
  const [editor] = useLexicalComposerContext()

  const onClick = () => {
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor, null)

      onSubmit(htmlString)
    })
  }

  return <button onClick={onClick}>Submit</button>
}

type SubmitButtonProps = {
  onSubmit: (value: string) => void
}
