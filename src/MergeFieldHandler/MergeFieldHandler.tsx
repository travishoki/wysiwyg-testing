import React, { useImperativeHandle } from "react"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { mergeFieldObject } from "../MergeFieldControls/const"
import { INSERT_MERGE_FIELD_COMMAND } from "../const"

export type composerRefProps = {
  dispatchMergeField: (mergeFieldObject: mergeFieldObject) => void
}

export const MergeFieldHandler = ({ composerRef }: MergeFieldHandlerProps): null => {
  const [editor] = useLexicalComposerContext()

  useImperativeHandle(composerRef, () => ({
    dispatchMergeField(mergeFieldObject: mergeFieldObject) {
      const payload = {
        mergeFieldId: mergeFieldObject.id,
        mergeFieldIconUrl: mergeFieldObject.iconUrl,
      }
      editor.dispatchCommand(INSERT_MERGE_FIELD_COMMAND, payload)
    },
  }))

  return null
}

type MergeFieldHandlerProps = {
  composerRef: React.MutableRefObject<composerRefProps>
}
