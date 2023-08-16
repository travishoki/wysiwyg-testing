import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { $generateHtmlFromNodes } from "@lexical/html"
import { $getRoot, EditorThemeClasses, LexicalEditor } from "lexical"
import { createPortal } from "react-dom"
import { TableComponentTableActionMenu } from "./TableComponentTableActionMenu"
import { TableCellEditor } from "./TableComponentTableCellEditor"
import { SortOptions } from "./TableComponentTypes"
import { Cell, cellHTMLCache, cellTextContentCache, Rows, TableNode } from "./TableNode"

const createEmptyParagraphHTML = (theme: EditorThemeClasses): string => {
  return `<p class="${theme.paragraph}"><br></p>`
}

const generateHTMLFromJSON = (editorStateJSON: string, cellEditor: LexicalEditor): string => {
  const editorState = cellEditor.parseEditorState(editorStateJSON)
  let html = cellHTMLCache.get(editorStateJSON)
  if (html === undefined) {
    html = editorState.read(() => $generateHtmlFromNodes(cellEditor, null))
    const textContent = editorState.read(() => $getRoot().getTextContent())
    cellHTMLCache.set(editorStateJSON, html)
    cellTextContentCache.set(editorStateJSON, textContent)
  }
  return html
}

type TableCellProps = {
  cell: Cell
  isEditing: boolean
  isSelected: boolean
  isPrimarySelected: boolean
  theme: EditorThemeClasses
  cellEditor: LexicalEditor
  updateCellsByID: (ids: Array<string>, fn: () => void) => void
  updateTableNode: (fn2: (tableNode: TableNode) => void) => void
  cellCoordMap: Map<string, [number, number]>
  rows: Rows
  setSortingOptions: (options: null | SortOptions) => void
  sortingOptions: null | SortOptions
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
      tabIndex={-1}
      style={{ width: cellWidth !== null ? cellWidth : undefined }}
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
          <TableComponentTableActionMenu
            cell={cell}
            menuElem={menuElem}
            updateCellsByID={updateCellsByID}
            onClose={() => setShowMenu(false)}
            updateTableNode={updateTableNode}
            cellCoordMap={cellCoordMap}
            rows={rows}
            setSortingOptions={setSortingOptions}
            sortingOptions={sortingOptions}
          />,
          document.body,
        )}
      {isSorted && <div className={theme.tableCellSortedIndicator} />}
    </CellComponent>
  )
}
