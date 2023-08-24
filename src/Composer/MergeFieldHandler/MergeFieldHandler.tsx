import React, { useImperativeHandle } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { mergeFieldObject } from "../../MergeFieldControls/MergeFieldControls.const"
import { INSERT_MERGE_FIELD_COMMAND } from "../const"

export type composerRefProps = Maybe<{
  dispatchMergeField: (mergeFieldObject: mergeFieldObject) => void
}>

type MergeFieldHandlerProps = {
  composerRef: React.MutableRefObject<composerRefProps>
}

export const MergeFieldHandler = ({ composerRef }: MergeFieldHandlerProps): null => {
  const [editor] = useLexicalComposerContext()

  useImperativeHandle(composerRef, () => ({
    dispatchMergeField(mergeFieldObject: mergeFieldObject) {
      const payload = {
        mergeFieldIconUrl: mergeFieldObject.iconUrl,
        mergeFieldId: mergeFieldObject.id,
      }
      editor.dispatchCommand(INSERT_MERGE_FIELD_COMMAND, payload)
    },
  }))

  return null
}
