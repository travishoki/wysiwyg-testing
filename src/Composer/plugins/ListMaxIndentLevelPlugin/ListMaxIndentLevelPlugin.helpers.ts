import { $getListDepth, $isListItemNode, $isListNode } from "@lexical/list"
import {
  $getSelection,
  $isElementNode,
  $isRangeSelection,
  ElementNode,
  RangeSelection,
} from "lexical"

const getElementNodesInSelection = (selection: RangeSelection): Set<ElementNode> => {
  const nodesInSelection = selection.getNodes()

  if (nodesInSelection.length === 0) {
    return new Set([
      selection.anchor.getNode().getParentOrThrow(),
      selection.focus.getNode().getParentOrThrow(),
    ])
  }

  return new Set(nodesInSelection.map((n) => ($isElementNode(n) ? n : n.getParentOrThrow())))
}

export const isIndentPermitted = (maxDepth: number): boolean => {
  const selection = $getSelection()

  if (!$isRangeSelection(selection)) {
    return false
  }

  const elementNodesInSelection: Set<ElementNode> = getElementNodesInSelection(selection)

  let totalDepth = 0

  elementNodesInSelection.forEach((elementNode) => {
    if ($isListNode(elementNode)) {
      totalDepth = Math.max($getListDepth(elementNode) + 1, totalDepth)
    } else if ($isListItemNode(elementNode)) {
      const parent = elementNode.getParent()

      if (!$isListNode(parent)) {
        throw new Error(
          "ListMaxIndentLevelPlugin: A ListItemNode must have a ListNode for a parent.",
        )
      }

      totalDepth = Math.max($getListDepth(parent) + 1, totalDepth)
    }
  })

  return totalDepth <= maxDepth
}
