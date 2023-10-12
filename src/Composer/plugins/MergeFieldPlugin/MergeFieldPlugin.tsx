import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils"
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
} from "lexical"
import { MergeField } from "types"
import { INSERT_MERGE_FIELD_COMMAND } from "../../const"
import { $createMergeFieldNode, MergeFieldNode } from "../../nodes/MergeField/MergeFieldNode"
import { useMergeFields } from "./MergeFieldPlugin.hooks"

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
