import { useEffect, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $createParagraphNode,
  $insertNodes,
  $isRootOrShadowRoot,
  COMMAND_PRIORITY_EDITOR,
} from "lexical"
import { $wrapNodeInElement, mergeRegister } from "@lexical/utils"

import { DELETE_HOKI_COMMAND, INSERT_HOKI_COMMAND } from "../../const"
import { $createHokiNode, HokiNode } from "../../nodes/HokiNode"

export default function HokiPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext()
  const [element, setElement] = useState<HokiNode>()

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
          setElement(hokiNode)

          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor.registerCommand(
        DELETE_HOKI_COMMAND,
        () => {
          if (element) {
            element.remove()
          }

          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    )
  }, [editor, element])

  return null
}