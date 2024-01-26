import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $createParagraphNode,
  $getRoot,
  $isElementNode,
  COMMAND_PRIORITY_LOW,
  KEY_DOWN_COMMAND,
  LexicalEditor,
} from "lexical"
import { isSelectAll } from "./SelectAllPlugin.helpers"

export function $selectAll(editor: LexicalEditor) {
  const root = $getRoot()
  const lastNode = root.getLastChild()

  if (!$isElementNode(lastNode) && lastNode) {
    lastNode.insertAfter($createParagraphNode())
  }

  root.select(0, root.getChildrenSize())

  const rootElement = editor.getRootElement() as HTMLDivElement
  rootElement.focus({
    preventScroll: true,
  })
}

export const SelectAllPlugin = (): null => {
  const [editor] = useLexicalComposerContext()

  editor.registerCommand<KeyboardEvent>(
    KEY_DOWN_COMMAND,
    (event) => {
      const { ctrlKey, keyCode, metaKey } = event

      if (isSelectAll(keyCode, metaKey, ctrlKey)) {
        event.preventDefault()
        editor.update(() => {
          $selectAll(editor)
        })

        return true
      }

      return false
    },
    COMMAND_PRIORITY_LOW,
  )

  return null
}
