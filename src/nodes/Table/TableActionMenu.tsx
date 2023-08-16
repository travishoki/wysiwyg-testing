import * as React from "react"
import { useEffect, useRef } from "react"
import { $addUpdateTag, $createParagraphNode, $getRoot } from "lexical"
import { Cell, Rows, TableNode } from "./TableNode"
import { SortOptions } from "./types"

type TableActionMenuProps = {
  cell: Cell
  cellCoordMap: Map<string, [number, number]>,
  menuElem: HTMLElement,
  onClose: () => void
  rows: Rows,
  setSortingOptions: (options: null | SortOptions) => void,
  sortingOptions: null | SortOptions,
  updateCellsByID: (ids: Array<string>, fn: () => void) => void,
  updateTableNode: (fn2: (tableNode: TableNode) => void) => void
}

export const TableActionMenu = ({
  cell,
  rows,
  cellCoordMap,
  menuElem,
  updateCellsByID,
  onClose,
  updateTableNode,
  setSortingOptions,
  sortingOptions,
}: TableActionMenuProps) => {
  const dropDownRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    const dropdownElem = dropDownRef.current
    if (dropdownElem !== null) {
      const rect = menuElem.getBoundingClientRect()
      dropdownElem.style.top = `${rect.y}px`
      dropdownElem.style.left = `${rect.x}px`
    }
  }, [menuElem])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownElem = dropDownRef.current
      if (dropdownElem !== null && !dropdownElem.contains(event.target as Node)) {
        event.stopPropagation()
      }
    }

    window.addEventListener("click", handleClickOutside)

    return () => window.removeEventListener("click", handleClickOutside)
  }, [onClose])
  const coords = cellCoordMap.get(cell.id)

  if (coords === undefined) {
    return null
  }
  const [x, y] = coords

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className="dropdown"
      onClick={(e) => {
        e.stopPropagation()
      }}
      onPointerDown={(e) => {
        e.stopPropagation()
      }}
      onPointerMove={(e) => {
        e.stopPropagation()
      }}
      onPointerUp={(e) => {
        e.stopPropagation()
      }}
      ref={dropDownRef}
    >
      <button
        className="item"
        onClick={() => {
          updateTableNode((tableNode) => {
            $addUpdateTag("history-push")
            tableNode.updateCellType(x, y, cell.type === "normal" ? "header" : "normal")
          })
          onClose()
        }}
      >
        <span className="text">{cell.type === "normal" ? "Make header" : "Remove header"}</span>
      </button>
      <button
        className="item"
        onClick={() => {
          updateCellsByID([cell.id], () => {
            const root = $getRoot()
            root.clear()
            root.append($createParagraphNode())
          })
          onClose()
        }}
      >
        <span className="text">Clear cell</span>
      </button>
      <hr />
      {cell.type === "header" && y === 0 && (
        <>
          {sortingOptions !== null && sortingOptions.x === x && (
            <button
              className="item"
              onClick={() => {
                setSortingOptions(null)
                onClose()
              }}
            >
              <span className="text">Remove sorting</span>
            </button>
          )}
          {(sortingOptions === null ||
            sortingOptions.x !== x ||
            sortingOptions.type === "descending") && (
            <button
              className="item"
              onClick={() => {
                setSortingOptions({ type: "ascending", x })
                onClose()
              }}
            >
              <span className="text">Sort ascending</span>
            </button>
          )}
          {(sortingOptions === null ||
            sortingOptions.x !== x ||
            sortingOptions.type === "ascending") && (
            <button
              className="item"
              onClick={() => {
                setSortingOptions({ type: "descending", x })
                onClose()
              }}
            >
              <span className="text">Sort descending</span>
            </button>
          )}
          <hr />
        </>
      )}
      <button
        className="item"
        onClick={() => {
          updateTableNode((tableNode) => {
            $addUpdateTag("history-push")
            tableNode.insertRowAt(y)
          })
          onClose()
        }}
      >
        <span className="text">Insert row above</span>
      </button>
      <button
        className="item"
        onClick={() => {
          updateTableNode((tableNode) => {
            $addUpdateTag("history-push")
            tableNode.insertRowAt(y + 1)
          })
          onClose()
        }}
      >
        <span className="text">Insert row below</span>
      </button>
      <hr />
      <button
        className="item"
        onClick={() => {
          updateTableNode((tableNode) => {
            $addUpdateTag("history-push")
            tableNode.insertColumnAt(x)
          })
          onClose()
        }}
      >
        <span className="text">Insert column left</span>
      </button>
      <button
        className="item"
        onClick={() => {
          updateTableNode((tableNode) => {
            $addUpdateTag("history-push")
            tableNode.insertColumnAt(x + 1)
          })
          onClose()
        }}
      >
        <span className="text">Insert column right</span>
      </button>
      <hr />
      {rows[0].cells.length !== 1 && (
        <button
          className="item"
          onClick={() => {
            updateTableNode((tableNode) => {
              $addUpdateTag("history-push")
              tableNode.deleteColumnAt(x)
            })
            onClose()
          }}
        >
          <span className="text">Delete column</span>
        </button>
      )}
      {rows.length !== 1 && (
        <button
          className="item"
          onClick={() => {
            updateTableNode((tableNode) => {
              $addUpdateTag("history-push")
              tableNode.deleteRowAt(y)
            })
            onClose()
          }}
        >
          <span className="text">Delete row</span>
        </button>
      )}
      <button
        className="item"
        onClick={() => {
          updateTableNode((tableNode) => {
            $addUpdateTag("history-push")
            tableNode.selectNext()
            tableNode.remove()
          })
          onClose()
        }}
      >
        <span className="text">Delete table</span>
      </button>
    </div>
  )
}
