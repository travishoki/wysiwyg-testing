import { MutableRefObject, useImperativeHandle } from "react"
import { $generateHtmlFromNodes } from "@lexical/html"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getRoot } from "lexical"
import { MergeField } from "types"
import { INSERT_MERGE_FIELD_COMMAND } from "../const"

export type composerRefProps = Maybe<{
  dispatchMergeField: (mergeField: MergeField) => void
  onLock: () => void
  onSubmit: () => string
}>

type MergeFieldHandlerProps = {
  composerRef: MutableRefObject<composerRefProps>
}

export const ComposerCustomFunctionHandler = ({ composerRef }: MergeFieldHandlerProps): null => {
  const [editor] = useLexicalComposerContext()

  useImperativeHandle(composerRef, () => ({
    dispatchMergeField(mergeField: MergeField) {
      const payload = {
        mergeFieldName: mergeField.name ?? "",
      }
      editor.dispatchCommand(INSERT_MERGE_FIELD_COMMAND, payload)
    },
    getIsEmpty(): boolean {
      const root = $getRoot()
      const children = root.getChildren()

      return children.length === 0
    },
    onLock() {
      editor.update(() => {
        editor.setEditable(!editor.isEditable())
      })
    },
    onSubmit(): string {
      let htmlString = ""

      editor.update(() => {
        htmlString = $generateHtmlFromNodes(editor, null)
      })

      return htmlString
    },
  }))

  return null
}
