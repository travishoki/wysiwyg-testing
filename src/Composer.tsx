import React from "react"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { Controls } from "./Controls/Controls"
import { Editor } from "./Editor"
import { MergeFieldHandler, composerRefProps } from "./MergeFieldHandler/MergeFieldHandler"
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext"
import { SharedHistoryContext } from "./context/SharedHistoryContext"
import { PlaygroundNodes } from "./nodes/PlaygroundNodes"
import { TableContext } from "./plugins/TablePlugin/TableContext"
import { ComposerTheme } from "./themes/ComposerTheme"
import { Maybe } from "./types/globals"

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
const onError = (error: Error) => {
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
  setOutput: (output: Maybe<string>) => void
}
