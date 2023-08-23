import React from "react"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import styles from "./Composer.module.scss"
import { MergeFieldHandler, composerRefProps } from "./MergeFieldHandler/MergeFieldHandler"
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext"
import { SharedHistoryContext } from "./context/SharedHistoryContext"
import { ComposerNodes } from "./nodes/ComposerNodes"
import { TableContext } from "./plugins/TablePlugin/TableContext/TableContext"
import { ComposerTheme } from "./themes/ComposerTheme"
import { Maybe } from "./types/globals"
import { Controls } from "./ui/Controls/Controls"
import { Editor } from "./ui/Editor/Editor"

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

type ComposerProps = {
  composerRef: React.MutableRefObject<composerRefProps>
  onChange?: () => void
  onSubmit: (output: Maybe<string>) => void
}

export const Composer = ({ composerRef, onChange, onSubmit }: ComposerProps) => {
  return (
    <div className="composer">
      <LexicalComposer initialConfig={initialConfig}>
        <SharedHistoryContext>
          <TableContext>
            <SharedAutocompleteContext>
              <div className={styles.editorShell}>
                <MergeFieldHandler composerRef={composerRef} />
                <Editor />
                <Controls onSubmit={onSubmit} />
                <OnChangePlugin onChange={() => onChange && onChange()} />
              </div>
            </SharedAutocompleteContext>
          </TableContext>
        </SharedHistoryContext>
      </LexicalComposer>
    </div>
  )
}
