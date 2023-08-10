import React from "react"

import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"

import { SharedHistoryContext } from "./context/SharedHistoryContext"
import { TableContext } from "./plugins/TablePlugin"
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext"
import { PlaygroundNodes } from "./nodes/PlaygroundNodes"
import { ComposerTheme } from "./themes/ComposerTheme"
import { Editor } from "./Editor"
import { Controls } from "./Controls/Controls"
import { MergeFieldHandler, composerRefProps } from "./MergeFieldHandler/MergeFieldHandler"

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error: Error) {
  console.error(error)
}

const initialConfig = {
  namespace: "Composer",
  nodes: [...PlaygroundNodes],
  onError,
  theme: ComposerTheme,
}

export const Composer = ({ composerRef, setOutput }: ComposerProps) => {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <SharedHistoryContext>
        <TableContext>
          <SharedAutocompleteContext>
            <div className="editor-shell">
              <MergeFieldHandler composerRef={composerRef} />
              <Editor />
              <Controls onSubmit={setOutput} />
              <OnChangePlugin onChange={() => setOutput(null)} />
            </div>
          </SharedAutocompleteContext>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  )
}

type ComposerProps = {
  composerRef: React.MutableRefObject<composerRefProps>
  setOutput: (output: string) => void
}
