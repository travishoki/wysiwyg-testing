import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
} from "lexical"
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils"

import { INSERT_HOKI_COMMAND } from "../../const"
import { $createHokiNode, HokiNode } from "../../nodes/HokiNode"

export default function HokiPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([HokiNode])) {
      throw new Error("HokiPlugin: HokiNode not registered on editor")
    }

    return mergeRegister(
      editor.registerCommand(
        INSERT_HOKI_COMMAND,
        () => {
          const hokiNode = $createHokiNode()
          $insertNodes([hokiNode])
          if ($isRootOrShadowRoot(hokiNode.getParentOrThrow())) {
            $wrapNodeInElement(hokiNode, $createParagraphNode).selectEnd()
          }

          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    )
  }, [editor])

  return null
}
