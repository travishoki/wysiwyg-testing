import { useEffect, useState } from "react"
import { LexicalEditor, TextNode } from "lexical"
import { MergeField } from "types"
import { $createMergeFieldNode, MergeFieldNode } from "../../nodes/MergeField/MergeFieldNode"
import { getIsValidMergeField, splitAtHandlebars } from "./MergeFieldPlugin.hooks.helpers"

export const useMergeFields = (
  editor: LexicalEditor,
  mergeFields: MergeField[],
  initialState: Maybe<string>,
): void => {
  const [storedInitialState, setStoredInitialState] = useState<string>()

  useEffect(() => {
    if (!editor.hasNodes([MergeFieldNode])) {
      throw new Error("MergeFieldPlugin: MergeFieldNode not registered on editor")
    }

    if (!initialState) return
    if (storedInitialState === initialState) return

    setStoredInitialState(initialState)

    return editor.registerNodeTransform(TextNode, (node: TextNode): void => {
      const text = node.getTextContent()

      const handlebarTextArray = splitAtHandlebars(text)
      const hasHandlebars = handlebarTextArray.length > 1

      if (hasHandlebars) {
        handlebarTextArray.forEach((textSegment) => {
          const isValidMergeField = getIsValidMergeField(textSegment, mergeFields)

          if (isValidMergeField) {
            const mergeFieldNode = $createMergeFieldNode(textSegment)

            node.insertBefore(mergeFieldNode)
          } else {
            node.insertBefore(new TextNode(textSegment))
          }
        })

        node.remove()
      }
    })
  }, [editor, initialState, mergeFields, setStoredInitialState, storedInitialState])
}
