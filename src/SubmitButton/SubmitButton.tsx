import React from "react"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $generateHtmlFromNodes } from "@lexical/html"

import "./SubmitButton.css"

export const SubmitButton = ({ onSubmit }: SubmitButtonProps) => {
  const [editor] = useLexicalComposerContext()

  const onClick = () => {
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor, null)

      onSubmit(htmlString)
    })
  }

  return (
    <button className="submit-button" onClick={onClick}>
      Submit
    </button>
  )
}

type SubmitButtonProps = {
  onSubmit: (value: string) => void
}
