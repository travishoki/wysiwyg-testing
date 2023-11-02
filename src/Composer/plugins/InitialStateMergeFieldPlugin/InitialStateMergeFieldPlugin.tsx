import { useEffect, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { TextNode } from "lexical"
import { MergeField } from "types"
import { $createMergeFieldNode, MergeFieldNode } from "../../nodes/MergeField/MergeFieldNode"
import { getIsValidMergeField, splitAtHandlebars } from "./InitialStateMergeFieldPlugin.helpers"

type InitialStateMergeFieldPluginProps = {
  initialState: string
  mergeFields: MergeField[]
}

export function InitialStateMergeFieldPlugin({
  initialState,
  mergeFields,
}: InitialStateMergeFieldPluginProps): JSX.Element | null {
  const [editor] = useLexicalComposerContext()
  const [hasBeenIntialized, setHasBeenIntialized] = useState(false)

  useEffect(() => {
    if (hasBeenIntialized) return

    // Only needs to initialize once
    setHasBeenIntialized(true)

    if (!editor.hasNodes([MergeFieldNode])) {
      throw new Error("MergeFieldPlugin: MergeFieldNode not registered on editor")
    }

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
  }, [editor, hasBeenIntialized, initialState, mergeFields, setHasBeenIntialized])

  return null
}
