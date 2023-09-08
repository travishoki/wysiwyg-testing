import { LexicalEditor } from "lexical"

export const validateEditorState = async (editor: LexicalEditor): Promise<void> => {
  const stringifiedEditorState = JSON.stringify(editor.getEditorState())
  let response = null
  try {
    response = await fetch("http://localhost:1235/validateEditorState", {
      body: stringifiedEditorState,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      method: "POST",
    })
  } catch {
    // NO-OP
  }
  if (response !== null && response.status === 403) {
    throw new Error("Editor state validation failed! Server did not accept changes.")
  }
}
