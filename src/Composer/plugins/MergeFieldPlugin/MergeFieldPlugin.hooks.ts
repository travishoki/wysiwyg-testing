import { useEffect } from "react"
import { LexicalEditor, TextNode } from "lexical"
import { MergeField } from "types"
import { $createMergeFieldNode, MergeFieldNode } from "../../nodes/MergeField/MergeFieldNode"
import { getHandlebarsMatch, getIsValidMergeField } from "./MergeFieldPlugin.hooks.helpers"

export const useMergeFields = (editor: LexicalEditor, mergeFields: MergeField[]): void => {
  useEffect(() => {
    if (!editor.hasNodes([MergeFieldNode])) {
      throw new Error("MergeFieldPlugin: MergeFieldNode not registered on editor")
    }

    return editor.registerNodeTransform(TextNode, (node: TextNode): void => {
      const text = node.getTextContent()
      const handlebarsMatch = getHandlebarsMatch(text)
      const hasHandlebars = !!handlebarsMatch

      if (hasHandlebars) {
        handlebarsMatch.forEach((mergeFieldName) => {
          const isValidMergeField = getIsValidMergeField(mergeFieldName, mergeFields)

          if (isValidMergeField) {
            const mergeFieldNode = $createMergeFieldNode(mergeFieldName)

            text.split(`{{${mergeFieldName}}}`).forEach((str, index) => {
              if (index !== 0) {
                node.insertBefore(mergeFieldNode)
              }

              node.insertBefore(new TextNode(str))
            })

            node.remove()
          }
        })
      }
    })
  }, [editor, mergeFields])
}
