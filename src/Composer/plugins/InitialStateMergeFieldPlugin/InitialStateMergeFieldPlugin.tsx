import { useEffect, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { TextNode } from "lexical"
import { MergeField } from "types"
import { $createMergeFieldNode } from "../../nodes/MergeField/MergeFieldNode"
import { getHasHandlebars, getValidMergeField, splitAtHandlebars } from "./helpers"

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
    // Only needs to initialize once
    if (!hasBeenIntialized) {
      setHasBeenIntialized(true)

      const removeTransform = editor.registerNodeTransform(TextNode, (node: TextNode): void => {
        const text = node.getTextContent()
        const hasHandlebars = getHasHandlebars(text)

        if (hasHandlebars) {
          const handlebarTextArray = splitAtHandlebars(text)

          handlebarTextArray.forEach((textSegment) => {
            const mergeField = getValidMergeField(textSegment, mergeFields)
            const isValidMergeField = !!mergeField

            if (isValidMergeField && mergeField.name) {
              const mergeFieldNode = $createMergeFieldNode(mergeField.id, mergeField.name)
              mergeFieldNode.setStyle(node.getStyle())
              mergeFieldNode.setFormat(node.getFormat())

              node.insertBefore(mergeFieldNode)
            } else {
              node.insertBefore(new TextNode(textSegment))
            }
          })

          node.remove()
        }
      })

      // Only run the transform once
      removeTransform()
    }
  }, [editor, hasBeenIntialized, initialState, mergeFields, setHasBeenIntialized])

  return null
}
