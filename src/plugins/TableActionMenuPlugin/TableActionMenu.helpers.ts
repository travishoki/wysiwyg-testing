import { $isTableCellNode, $isTableRowNode } from "@lexical/table"
import { GridSelection } from "lexical"
import { invariant } from "../../shared/invariant"

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
