import React from "react"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

export const SubmitButton = () => {
  const [editor] = useLexicalComposerContext()

  const onSubmit = () => {
    console.log("%c---- %s -----", "font-size: 12px;", "onSubmit")

    console.log("editor:")
    console.dir(editor)

    const editorState = editor.getEditorState()

    console.log("editorState:")
    console.dir(editorState)
  }

  return <button onClick={onSubmit}>Submit</button>
}
