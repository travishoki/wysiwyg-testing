import { $isTableCellNode, $isTableRowNode } from "@lexical/table"
import {
  $getSelection,
  $isElementNode,
  $isParagraphNode,
  $isRangeSelection,
  $isTextNode,
  DEPRECATED_$getNodeTriplet as $getNodeTriplet,
  DEPRECATED_$isGridSelection as $isGridSelection,
  DEPRECATED_GridCellNode as GridCellNode,
  ElementNode,
  GridSelection,
  LexicalEditor,
} from "lexical"
import { invariant } from "../../../shared/invariant"

export const $canUnmerge = (): boolean => {
  const selection = $getSelection()
  if (
    ($isRangeSelection(selection) && !selection.isCollapsed()) ||
    ($isGridSelection(selection) && !selection.anchor.is(selection.focus)) ||
    (!$isRangeSelection(selection) && !$isGridSelection(selection))
  ) {
    return false
  }
  const [cell] = $getNodeTriplet(selection.anchor)

  return cell.__colSpan > 1 || cell.__rowSpan > 1
}

export const $cellContainsEmptyParagraph = (cell: GridCellNode): boolean => {
  if (cell.getChildrenSize() !== 1) {
    return false
  }
  const firstChild = cell.getFirstChildOrThrow()
  if (!$isParagraphNode(firstChild) || !firstChild.isEmpty()) {
    return false
  }

  return true
}

export const $selectLastDescendant = (node: ElementNode): void => {
  const lastDescendant = node.getLastDescendant()
  if ($isTextNode(lastDescendant)) {
    lastDescendant.select()
  } else if ($isElementNode(lastDescendant)) {
    lastDescendant.selectEnd()
  } else if (lastDescendant !== null) {
    lastDescendant.selectNext()
  }
}

type computeSelectionCountProps = {
  columns: number
  rows: number
}

export const computeSelectionCount = (selection: GridSelection): computeSelectionCountProps => {
  const selectionShape = selection.getShape()

  return {
    columns: selectionShape.toX - selectionShape.fromX + 1,
    rows: selectionShape.toY - selectionShape.fromY + 1,
  }
}

export const currentCellBackgroundColor = (editor: LexicalEditor): null | string => {
  return editor.getEditorState().read(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection) || $isGridSelection(selection)) {
      const [cell] = $getNodeTriplet(selection.anchor)
      if ($isTableCellNode(cell)) {
        return cell.getBackgroundColor()
      }
    }

    return null
  })
}

// This is important when merging cells as there is no good way to re-merge weird shapes (a result
// of selecting merged cells and non-merged)
export const isGridSelectionRectangular = (selection: GridSelection): boolean => {
  const nodes = selection.getNodes()
  const currentRows: Array<number> = []
  let currentRow = null
  let expectedColumns = null
  let currentColumns = 0
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if ($isTableCellNode(node)) {
      const row = node.getParentOrThrow()
      invariant($isTableRowNode(row), "Expected CellNode to have a RowNode parent")
      if (currentRow !== row) {
        if (expectedColumns !== null && currentColumns !== expectedColumns) {
          return false
        }
        if (currentRow !== null) {
          expectedColumns = currentColumns
        }
        currentRow = row
        currentColumns = 0
      }
      const colSpan = node.__colSpan
      for (let j = 0; j < colSpan; j++) {
        if (currentRows[currentColumns + j] === undefined) {
          currentRows[currentColumns + j] = 0
        }
        currentRows[currentColumns + j] += node.__rowSpan
      }
      currentColumns += colSpan
    }
  }

  return (
    (expectedColumns === null || currentColumns === expectedColumns) &&
    currentRows.every((v) => v === currentRows[0])
  )
}
