import React from "react"
import { $generateHtmlFromNodes } from "@lexical/html"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { Button } from "../Button/Button"

export const SubmitButton = ({ onSubmit }: SubmitButtonProps) => {
  const [editor] = useLexicalComposerContext()

  const onClick = () => {
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor, null)

      onSubmit(htmlString)
    })
  }

  return <Button onClick={onClick} title="Submit" />
}

type SubmitButtonProps = {
  onSubmit: (value: string) => void
}
