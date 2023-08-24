import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils"
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
} from "lexical"
import { INSERT_MERGE_FIELD_COMMAND } from "../../const"
import { $createMergeFieldNode, MergeFieldNode } from "../../nodes/MergeField/MergeFieldNode"

export const MergeFieldPlugin = (): JSX.Element | null => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([MergeFieldNode])) {
      throw new Error("MergeFieldPlugin: MergeFieldNode not registered on editor")
    }

    return mergeRegister(
      editor.registerCommand(
        INSERT_MERGE_FIELD_COMMAND,
        (payload) => {
          const {
            // mergeFieldIconUrl,
            mergeFieldName,
          } = payload
          const MergeFieldNode = $createMergeFieldNode(
            // mergeFieldIconUrl,
            mergeFieldName,
          )
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
