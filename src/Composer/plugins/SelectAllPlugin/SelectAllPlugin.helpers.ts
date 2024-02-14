import { $getRoot, $isElementNode, $isTextNode, $setSelection, RangeSelection } from "lexical"
import { PointType } from "lexical/LexicalSelection"
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

export const $selectAll = () => {
  const root = $getRoot()
  const selection = root.select(0, root.getChildrenSize())
  $setSelection($normalizeSelection(selection))
}

const $normalizeSelection = (selection: RangeSelection) => {
  $normalizePoint(selection.anchor)
  $normalizePoint(selection.focus)

  return selection
}

const $normalizePoint = (point: PointType) => {
  while (point.type === "element") {
    const node = point.getNode()
    const offset = point.offset
    let nextNode
    let nextOffsetAtEnd

    if (offset === node.getChildrenSize()) {
      nextNode = node.getChildAtIndex(offset - 1)
      nextOffsetAtEnd = true
    } else {
      nextNode = node.getChildAtIndex(offset)
      nextOffsetAtEnd = false
    }

    if ($isTextNode(nextNode)) {
      point.set(nextNode.__key, nextOffsetAtEnd ? nextNode.getTextContentSize() : 0, "text")
      break
    } else if (!$isElementNode(nextNode)) {
      break
    }

    point.set(nextNode.__key, nextOffsetAtEnd ? nextNode.getChildrenSize() : 0, "element")
  }
}
