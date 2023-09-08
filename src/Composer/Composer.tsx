import React, { MutableRefObject } from "react"
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import classNames from "classnames"
import { MergeField } from "types"
import styles from "./Composer.module.scss"
import {
  ComposerCustomFunctionHandler,
  composerRefProps,
} from "./ComposerCustomFunctionHandler/ComposerCustomFunctionHandler"
import { SharedAutocompleteContext } from "./context/SharedAutocompleteContext"
import { SharedHistoryContext } from "./context/SharedHistoryContext"
import { ComposerNodes } from "./nodes/ComposerNodes"
import { TableContext } from "./plugins/TablePlugin/TableContext/TableContext"
import { ComposerTheme } from "./themes/ComposerTheme"
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
  className?: string
  composerRef: MutableRefObject<composerRefProps>
  initialState: Maybe<string>
  mergeFields: MergeField[]
  onChange?: () => void
}

export const Composer = ({
  className,
  composerRef,
  initialState,
  mergeFields,
  onChange,
}: ComposerProps) => {
  return (
    <div className={classNames("composer", className)}>
      <LexicalComposer initialConfig={initialConfig}>
        <SharedHistoryContext>
          <TableContext>
            <SharedAutocompleteContext>
              <div className={styles.editorShell}>
                <ComposerCustomFunctionHandler composerRef={composerRef} />
                <Editor initialState={initialState} mergeFields={mergeFields} />
                <OnChangePlugin onChange={() => onChange && onChange()} />
              </div>
            </SharedAutocompleteContext>
          </TableContext>
        </SharedHistoryContext>
      </LexicalComposer>
    </div>
  )
}
