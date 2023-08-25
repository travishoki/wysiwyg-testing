import { MutableRefObject, useImperativeHandle } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { MergeField } from "types"
import { INSERT_MERGE_FIELD_COMMAND } from "../const"

export type composerRefProps = Maybe<{
  dispatchMergeField: (mergeField: MergeField) => void
}>

type MergeFieldHandlerProps = {
  composerRef: MutableRefObject<composerRefProps>
}

export const MergeFieldHandler = ({ composerRef }: MergeFieldHandlerProps): null => {
  const [editor] = useLexicalComposerContext()

  useImperativeHandle(composerRef, () => ({
    dispatchMergeField(mergeField: MergeField) {
      const payload = {
        // mergeFieldIconUrl: mergeField.iconUrl,
        mergeFieldName: mergeField.name,
      }
      editor.dispatchCommand(INSERT_MERGE_FIELD_COMMAND, payload)
    },
  }))

  return null
}
