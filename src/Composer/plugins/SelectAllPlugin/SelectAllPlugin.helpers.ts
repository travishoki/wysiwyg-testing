import { $createParagraphNode, $getRoot, $isElementNode, LexicalEditor } from "lexical"
import { IS_APPLE } from "../../shared/environment"

const controlOrMeta = (metaKey: boolean, ctrlKey: boolean): boolean => {
  if (IS_APPLE) {
    return metaKey
  }

  return ctrlKey
}

export const isSelectAll = (keyCode: number, metaKey: boolean, ctrlKey: boolean): boolean => {
  return keyCode === 65 && controlOrMeta(metaKey, ctrlKey)
}

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
