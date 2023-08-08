import * as React from "react"
import { useCallback } from "react"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"

import { MergeFieldButton } from "./MergeFieldButton/MergeFieldButton"
import { mergeFieldKeyArray, mergeFieldObject } from "./const"
import { INSERT_MERGE_FIELD_COMMAND } from "../const"
import "./MergeFieldControls.css"

export const MergeFieldControls = () => {
  const [editor] = useLexicalComposerContext()

  const onClick = useCallback(
    (mergeFieldObject: mergeFieldObject) => {
      const payload = {
        mergeFieldKey: mergeFieldObject.key,
        mergeFieldIconUrl: mergeFieldObject.iconUrl,
      }
      editor.dispatchCommand(INSERT_MERGE_FIELD_COMMAND, payload)
    },
    [editor],
  )

  return (
    <div className="controls">
      {mergeFieldKeyArray.map((mergeFieldKey) => (
        <MergeFieldButton
          key={mergeFieldKey.key}
          mergeFieldIconUrl={mergeFieldKey.iconUrl}
          mergeFieldKey={mergeFieldKey.key}
          onClick={onClick}
        />
      ))}
    </div>
  )
}
