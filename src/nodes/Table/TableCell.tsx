import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { EditorThemeClasses, LexicalEditor } from "lexical"
import { createPortal } from "react-dom"
import { TableActionMenu } from "./TableActionMenu"
import { createEmptyParagraphHTML, generateHTMLFromJSON } from "./TableCell.helpers"
import { TableCellEditor } from "./TableCellEditor"
import { Cell, Rows, TableNode } from "./TableNode"
import { SortOptions } from "./types"

type TableCellProps = {
  cell: Cell
  cellCoordMap: Map<string, [number, number]>,
  cellEditor: LexicalEditor,
  isEditing: boolean,
  isPrimarySelected: boolean,
  isSelected: boolean,
  rows: Rows,
  setSortingOptions: (options: null | SortOptions) => void,
  sortingOptions: null | SortOptions,
  theme: EditorThemeClasses,
  updateCellsByID: (ids: Array<string>, fn: () => void) => void,
  updateTableNode: (fn2: (tableNode: TableNode) => void) => void
}

export const TableCell = ({
  cell,
  cellCoordMap,
  cellEditor,
  isEditing,
  isSelected,
  isPrimarySelected,
  theme,
  updateCellsByID,
  updateTableNode,
  rows,
  setSortingOptions,
  sortingOptions,
}: TableCellProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRootRef = useRef(null)
  const isHeader = cell.type !== "normal"
  const editorStateJSON = cell.json
  const CellComponent = isHeader ? "th" : "td"
  const cellWidth = cell.width
  const menuElem = menuRootRef.current
  const coords = cellCoordMap.get(cell.id)
  const isSorted =
    sortingOptions !== null &&
    coords !== undefined &&
    coords[0] === sortingOptions.x &&
    coords[1] === 0

  useEffect(() => {
    if (isEditing || !isPrimarySelected) {
      setShowMenu(false)
    }
  }, [isEditing, isPrimarySelected])

  return (
    <CellComponent
      className={`${theme.tableCell} ${isHeader ? theme.tableCellHeader : ""} ${
        isSelected ? theme.tableCellSelected : ""
      }`}
      data-id={cell.id}
      style={{ width: cellWidth !== null ? cellWidth : undefined }}
      tabIndex={-1}
    >
      {isPrimarySelected && (
        <div
          className={`${theme.tableCellPrimarySelected} ${isEditing ? theme.tableCellEditing : ""}`}
        />
      )}
      {isPrimarySelected && isEditing ? (
        <TableCellEditor cellEditor={cellEditor} />
      ) : (
        <>
          <div
            dangerouslySetInnerHTML={{
              __html:
                editorStateJSON === ""
                  ? createEmptyParagraphHTML(theme)
                  : generateHTMLFromJSON(editorStateJSON, cellEditor),
            }}
          />
          <div className={theme.tableCellResizer} data-table-resize="true" />
        </>
      )}
      {isPrimarySelected && !isEditing && (
        <div className={theme.tableCellActionButtonContainer} ref={menuRootRef}>
          <button
            className={theme.tableCellActionButton}
            onClick={(e) => {
              setShowMenu(!showMenu)
              e.stopPropagation()
            }}
          >
            <i className="chevron-down" />
          </button>
        </div>
      )}
      {showMenu &&
        menuElem !== null &&
        createPortal(
          <TableActionMenu
            cell={cell}
            cellCoordMap={cellCoordMap}
            menuElem={menuElem}
            onClose={() => setShowMenu(false)}
            rows={rows}
            setSortingOptions={setSortingOptions}
            sortingOptions={sortingOptions}
            updateCellsByID={updateCellsByID}
            updateTableNode={updateTableNode}
          />,
          document.body,
        )}
      {isSorted && <div className={theme.tableCellSortedIndicator} />}
    </CellComponent>
  )
}
