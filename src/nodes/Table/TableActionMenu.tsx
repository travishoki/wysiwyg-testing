import React, { useEffect, useRef } from "react"
import { $addUpdateTag, $createParagraphNode, $getRoot } from "lexical"
import { HorizontalRule } from "../../HorizontalRule/HorizontalRule"
import stylesDropdown from "../../ui/DropDown/DropDown.module.scss"
import { TableNode } from "./TableNode"
import { Cell, Rows, SortOptions } from "./types"

type TableActionMenuProps = {
  cell: Cell
  cellCoordMap: Map<string, [number, number]>
  menuElem: HTMLElement
  onClose: () => void
  rows: Rows
  setSortingOptions: (options: null | SortOptions) => void
  sortingOptions: null | SortOptions
  updateCellsByID: (ids: Array<string>, fn: () => void) => void
  updateTableNode: (fn2: (tableNode: TableNode) => void) => void
}

export const TableActionMenu = ({
  cell,
  cellCoordMap,
  menuElem,
  onClose,
  rows,
  setSortingOptions,
  sortingOptions,
  updateCellsByID,
  updateTableNode,
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
      className={stylesDropdown.dropdown}
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
        className={stylesDropdown.dropdownItem}
        onClick={() => {
          updateTableNode((tableNode) => {
            $addUpdateTag("history-push")
            tableNode.updateCellType(x, y, cell.type === "normal" ? "header" : "normal")
          })
          onClose()
        }}
      >
        <span className={stylesDropdown.dropdownText}>
          {cell.type === "normal" ? "Make header" : "Remove header"}
        </span>
      </button>
      <button
        className={stylesDropdown.dropdownItem}
        onClick={() => {
          updateCellsByID([cell.id], () => {
            const root = $getRoot()
            root.clear()
            root.append($createParagraphNode())
          })
          onClose()
        }}
      >
        <span className={stylesDropdown.dropdownText}>Clear cell</span>
      </button>
      <HorizontalRule />
      {cell.type === "header" && y === 0 && (
        <>
          {sortingOptions !== null && sortingOptions.x === x && (
            <button
              className={stylesDropdown.dropdownItem}
              onClick={() => {
                setSortingOptions(null)
                onClose()
              }}
            >
              <span className={stylesDropdown.dropdownText}>Remove sorting</span>
            </button>
          )}
          {(sortingOptions === null ||
            sortingOptions.x !== x ||
            sortingOptions.type === "descending") && (
            <button
              className={stylesDropdown.dropdownItem}
              onClick={() => {
                setSortingOptions({ type: "ascending", x })
                onClose()
              }}
            >
              <span className={stylesDropdown.dropdownText}>Sort ascending</span>
            </button>
          )}
          {(sortingOptions === null ||
            sortingOptions.x !== x ||
            sortingOptions.type === "ascending") && (
            <button
              className={stylesDropdown.dropdownItem}
              onClick={() => {
                setSortingOptions({ type: "descending", x })
                onClose()
              }}
            >
              <span className={stylesDropdown.dropdownText}>Sort descending</span>
            </button>
          )}
          <HorizontalRule />
        </>
      )}
      <button
        className={stylesDropdown.dropdownItem}
        onClick={() => {
          updateTableNode((tableNode) => {
            $addUpdateTag("history-push")
            tableNode.insertRowAt(y)
          })
          onClose()
        }}
      >
        <span className={stylesDropdown.dropdownText}>Insert row above</span>
      </button>
      <button
        className={stylesDropdown.dropdownItem}
        onClick={() => {
          updateTableNode((tableNode) => {
            $addUpdateTag("history-push")
            tableNode.insertRowAt(y + 1)
          })
          onClose()
        }}
      >
        <span className={stylesDropdown.dropdownText}>Insert row below</span>
      </button>
      <HorizontalRule />
      <button
        className={stylesDropdown.dropdownItem}
        onClick={() => {
          updateTableNode((tableNode) => {
            $addUpdateTag("history-push")
            tableNode.insertColumnAt(x)
          })
          onClose()
        }}
      >
        <span className={stylesDropdown.dropdownText}>Insert column left</span>
      </button>
      <button
        className={stylesDropdown.dropdownItem}
        onClick={() => {
          updateTableNode((tableNode) => {
            $addUpdateTag("history-push")
            tableNode.insertColumnAt(x + 1)
          })
          onClose()
        }}
      >
        <span className={stylesDropdown.dropdownText}>Insert column right</span>
      </button>
      <HorizontalRule />
      {rows[0].cells.length !== 1 && (
        <button
          className={stylesDropdown.dropdownItem}
          onClick={() => {
            updateTableNode((tableNode) => {
              $addUpdateTag("history-push")
              tableNode.deleteColumnAt(x)
            })
            onClose()
          }}
        >
          <span className={stylesDropdown.dropdownText}>Delete column</span>
        </button>
      )}
      {rows.length !== 1 && (
        <button
          className={stylesDropdown.dropdownItem}
          onClick={() => {
            updateTableNode((tableNode) => {
              $addUpdateTag("history-push")
              tableNode.deleteRowAt(y)
            })
            onClose()
          }}
        >
          <span className={stylesDropdown.dropdownText}>Delete row</span>
        </button>
      )}
      <button
        className={stylesDropdown.dropdownItem}
        onClick={() => {
          updateTableNode((tableNode) => {
            $addUpdateTag("history-push")
            tableNode.selectNext()
            tableNode.remove()
          })
          onClose()
        }}
      >
        <span className={stylesDropdown.dropdownText}>Delete table</span>
      </button>
    </div>
  )
}
