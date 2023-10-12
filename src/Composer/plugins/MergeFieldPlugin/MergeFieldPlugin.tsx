import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils"
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
  LexicalEditor,
  TextNode,
} from "lexical"
import { MergeField } from "types"
import { INSERT_MERGE_FIELD_COMMAND } from "../../const"
import { $createMergeFieldNode, MergeFieldNode } from "../../nodes/MergeField/MergeFieldNode"
import { getHandlebarsMatch, getIsValidMergeField } from "./MergeFieldPlugin.helpers"

const useMergeFields = (editor: LexicalEditor, mergeFields: MergeField[]): void => {
  useEffect(() => {
    if (!editor.hasNodes([MergeFieldNode])) {
      throw new Error("EmojisPlugin: EmojiNode not registered on editor")
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

type MergeFieldPluginProps = {
  mergeFields: MergeField[]
}

export const MergeFieldPlugin = ({ mergeFields }: MergeFieldPluginProps): JSX.Element | null => {
  const [editor] = useLexicalComposerContext()
  useMergeFields(editor, mergeFields)

  useEffect(() => {
    if (!editor.hasNodes([MergeFieldNode])) {
      throw new Error("MergeFieldPlugin: MergeFieldNode not registered on editor")
    }

    return mergeRegister(
      editor.registerCommand(
        INSERT_MERGE_FIELD_COMMAND,
        (payload) => {
          const { mergeFieldName } = payload
          const MergeFieldNode = $createMergeFieldNode(mergeFieldName)
          $insertNodes([MergeFieldNode])
          if ($isRootOrShadowRoot(MergeFieldNode.getParentOrThrow())) {
            $wrapNodeInElement(MergeFieldNode, $createParagraphNode).selectEnd()
          }

          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    )
  }, [editor])

  return null
}
