import React, { useState } from "react"

import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { SharedHistoryContext } from "./context/SharedHistoryContext"
import { TableContext } from "./plugins/TablePlugin"
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext"
import PlaygroundNodes from "./nodes/PlaygroundNodes"
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme"

import Editor from "./Editor"
import { Output } from "./Output/Output"

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error)
}

const initialConfig = {
  namespace: "Playground",
  nodes: [...PlaygroundNodes],
  onError,
  theme: PlaygroundEditorTheme,
}

// ts-prune-ignore-next
export const App = () => {
  const [output, setOutput] = useState<string>()

  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
        <SharedHistoryContext>
          <TableContext>
            <SharedAutocompleteContext>
              <div className="editor-shell">
                <Editor onSubmit={setOutput} />
              </div>
            </SharedAutocompleteContext>
          </TableContext>
        </SharedHistoryContext>
      </LexicalComposer>

      <Output output={output} />
    </>
  )
}
