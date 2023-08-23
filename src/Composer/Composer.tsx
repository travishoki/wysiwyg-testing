import React from "react"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { Controls } from "../Controls/Controls"
import { MergeFieldHandler, composerRefProps } from "../MergeFieldHandler/MergeFieldHandler"
import styles from "./Composer.module.scss"
import { Editor } from "./Editor/Editor"
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext"
import { SharedHistoryContext } from "./context/SharedHistoryContext"
import { ComposerNodes } from "./nodes/ComposerNodes"
import { TableContext } from "./plugins/TablePlugin/TableContext/TableContext"
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
  nodes: [...ComposerNodes],
  onError,
  theme: ComposerTheme,
}

export const Composer = ({ composerRef, setOutput }: ComposerProps) => {
  return (
    <div className="composer">
      <LexicalComposer initialConfig={initialConfig}>
        <SharedHistoryContext>
          <TableContext>
            <SharedAutocompleteContext>
              <div className={styles.editorShell}>
                <MergeFieldHandler composerRef={composerRef} />
                <Editor />
                <Controls onSubmit={setOutput} />
                <OnChangePlugin onChange={() => setOutput(null)} />
              </div>
            </SharedAutocompleteContext>
          </TableContext>
        </SharedHistoryContext>
      </LexicalComposer>
    </div>
  )
}

type ComposerProps = {
  composerRef: React.MutableRefObject<composerRefProps>
  setOutput: (output: Maybe<string>) => void
}
