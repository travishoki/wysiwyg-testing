import React, { useCallback, useEffect, useRef, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $deleteTableColumn__EXPERIMENTAL as $deleteTableColumn,
  $deleteTableRow__EXPERIMENTAL as $deleteTableRow,
  $getTableColumnIndexFromTableCellNode,
  $getTableNodeFromLexicalNodeOrThrow,
  $getTableRowIndexFromTableCellNode,
  $insertTableColumn__EXPERIMENTAL as $insertTableColumn,
  $insertTableRow__EXPERIMENTAL as $insertTableRow,
  $isTableCellNode,
  $isTableRowNode,
  $unmergeCell,
  HTMLTableElementWithWithTableSelectionState,
  TableCellHeaderStates,
  TableCellNode,
  getTableSelectionFromTableElement,
} from "@lexical/table"
import {
  $createParagraphNode,
  $getRoot,
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
  DEPRECATED_$getNodeTriplet as $getNodeTriplet,
  DEPRECATED_$isGridCellNode as $isGridCellNode,
  DEPRECATED_$isGridSelection as $isGridSelection,
  DEPRECATED_GridCellNode as GridCellNode,
} from "lexical"
import { createPortal } from "react-dom"
import { useTranslation } from "src/i18n"
import { ColorPicker } from "../../../ui/ColorPicker/ColorPicker"
import stylesDropdown from "../../../ui/DropDown/DropDown.module.scss"
import {
  $canUnmerge,
  $cellContainsEmptyParagraph,
  $selectLastDescendant,
  computeSelectionCount,
  currentCellBackgroundColor,
  isGridSelectionRectangular,
} from "./TableActionMenu.helpers"

type TableCellActionMenuProps = Readonly<{
  cellMerge: boolean
  contextRef: { current: null | HTMLElement }
  onClose: () => void
  setIsMenuOpen: (isOpen: boolean) => void
  showColorPickerModal: (title: string, showModal: (onClose: () => void) => JSX.Element) => void
  tableCellNode: TableCellNode
}>

export const TableActionMenu = ({
  cellMerge,
  contextRef,
  onClose,
  setIsMenuOpen,
  showColorPickerModal,
  tableCellNode: _tableCellNode,
}: TableCellActionMenuProps) => {
  const [editor] = useLexicalComposerContext()
  const dropDownRef = useRef<HTMLDivElement | null>(null)
  const [tableCellNode, updateTableCellNode] = useState(_tableCellNode)
  const [selectionCounts, updateSelectionCounts] = useState({
    columns: 1,
    rows: 1,
  })
  const [canMergeCells, setCanMergeCells] = useState(false)
  const [canUnmergeCell, setCanUnmergeCell] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState(
    () => currentCellBackgroundColor(editor) || "",
  )

  const { t } = useTranslation("scenes", { keyPrefix: "composer" })

  useEffect(() => {
    return editor.registerMutationListener(TableCellNode, (nodeMutations) => {
      const nodeUpdated = nodeMutations.get(tableCellNode.getKey()) === "updated"

      if (nodeUpdated) {
        editor.getEditorState().read(() => {
          updateTableCellNode(tableCellNode.getLatest())
        })
        setBackgroundColor(currentCellBackgroundColor(editor) || "")
      }
    })
  }, [editor, tableCellNode])

  useEffect(() => {
    editor.getEditorState().read(() => {
      const selection = $getSelection()
      // Merge cells
      if ($isGridSelection(selection)) {
        const currentSelectionCounts = computeSelectionCount(selection)
        updateSelectionCounts(computeSelectionCount(selection))
        setCanMergeCells(
          isGridSelectionRectangular(selection) &&
            (currentSelectionCounts.columns > 1 || currentSelectionCounts.rows > 1),
        )
      }
      // Unmerge cell
      setCanUnmergeCell($canUnmerge())
    })
  }, [editor])

  useEffect(() => {
    const menuButtonElement = contextRef.current
    const dropDownElement = dropDownRef.current
    const rootElement = editor.getRootElement()

    if (menuButtonElement != null && dropDownElement != null && rootElement != null) {
      const rootEleRect = rootElement.getBoundingClientRect()
      const menuButtonRect = menuButtonElement.getBoundingClientRect()
      dropDownElement.style.opacity = "1"
      const dropDownElementRect = dropDownElement.getBoundingClientRect()
      const margin = 5
      let leftPosition = menuButtonRect.right + margin
      if (
        leftPosition + dropDownElementRect.width > window.innerWidth ||
        leftPosition + dropDownElementRect.width > rootEleRect.right
      ) {
        const position = menuButtonRect.left - dropDownElementRect.width - margin
        leftPosition = (position < 0 ? margin : position) + window.pageXOffset
      }
      dropDownElement.style.left = `${leftPosition + window.pageXOffset}px`

      let topPosition = menuButtonRect.top
      if (topPosition + dropDownElementRect.height > window.innerHeight) {
        const position = menuButtonRect.bottom - dropDownElementRect.height
        topPosition = (position < 0 ? margin : position) + window.pageYOffset
      }
      dropDownElement.style.top = `${topPosition + +window.pageYOffset}px`
    }
  }, [contextRef, dropDownRef, editor])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current != null &&
        contextRef.current != null &&
        !dropDownRef.current.contains(event.target as Node) &&
        !contextRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("click", handleClickOutside)

    return () => window.removeEventListener("click", handleClickOutside)
  }, [setIsMenuOpen, contextRef])

  const clearTableSelection = useCallback(() => {
    editor.update(() => {
      if (tableCellNode.isAttached()) {
        const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
        const tableElement = editor.getElementByKey(
          tableNode.getKey(),
        ) as HTMLTableElementWithWithTableSelectionState

        if (!tableElement) {
          throw new Error("Expected to find tableElement in DOM")
        }

        const tableSelection = getTableSelectionFromTableElement(tableElement)
        if (tableSelection !== null) {
          tableSelection.clearHighlight()
        }

        tableNode.markDirty()
        updateTableCellNode(tableCellNode.getLatest())
      }

      const rootNode = $getRoot()
      rootNode.selectStart()
    })
  }, [editor, tableCellNode])

  const mergeTableCellsAtSelection = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isGridSelection(selection)) {
        const { columns, rows } = computeSelectionCount(selection)
        const nodes = selection.getNodes()
        let firstCell: null | GridCellNode = null
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i]
          if ($isGridCellNode(node)) {
            if (firstCell === null) {
              node.setColSpan(columns).setRowSpan(rows)
              firstCell = node
              const isEmpty = $cellContainsEmptyParagraph(node)
              const firstChild = node.getFirstChild()
              if (isEmpty && $isParagraphNode(firstChild)) {
                firstChild.remove()
              }
            } else if ($isGridCellNode(firstCell)) {
              const isEmpty = $cellContainsEmptyParagraph(node)
              if (!isEmpty) {
                firstCell.append(...node.getChildren())
              }
              node.remove()
            }
          }
        }
        if (firstCell !== null) {
          if (firstCell.getChildrenSize() === 0) {
            firstCell.append($createParagraphNode())
          }
          $selectLastDescendant(firstCell)
        }
        onClose()
      }
    })
  }

  const unmergeTableCellsAtSelection = () => {
    editor.update(() => {
      $unmergeCell()
    })
  }

  const insertTableRowAtSelection = useCallback(
    (shouldInsertAfter: boolean) => {
      editor.update(() => {
        $insertTableRow(shouldInsertAfter)
        onClose()
      })
    },
    [editor, onClose],
  )

  const insertTableColumnAtSelection = useCallback(
    (shouldInsertAfter: boolean) => {
      editor.update(() => {
        for (let i = 0; i < selectionCounts.columns; i++) {
          $insertTableColumn(shouldInsertAfter)
        }
        onClose()
      })
    },
    [editor, onClose, selectionCounts.columns],
  )

  const deleteTableRowAtSelection = useCallback(() => {
    editor.update(() => {
      $deleteTableRow()
      onClose()
    })
  }, [editor, onClose])

  const deleteTableAtSelection = useCallback(() => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)
      tableNode.remove()

      clearTableSelection()
      onClose()
    })
  }, [editor, tableCellNode, clearTableSelection, onClose])

  const deleteTableColumnAtSelection = useCallback(() => {
    editor.update(() => {
      $deleteTableColumn()
      onClose()
    })
  }, [editor, onClose])

  const toggleTableRowIsHeader = useCallback(() => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)

      const tableRowIndex = $getTableRowIndexFromTableCellNode(tableCellNode)

      const tableRows = tableNode.getChildren()

      if (tableRowIndex >= tableRows.length || tableRowIndex < 0) {
        throw new Error("Expected table cell to be inside of table row.")
      }

      const tableRow = tableRows[tableRowIndex]

      if (!$isTableRowNode(tableRow)) {
        throw new Error("Expected table row")
      }

      tableRow.getChildren().forEach((tableCell) => {
        if (!$isTableCellNode(tableCell)) {
          throw new Error("Expected table cell")
        }

        tableCell.toggleHeaderStyle(TableCellHeaderStates.ROW)
      })

      clearTableSelection()
      onClose()
    })
  }, [editor, tableCellNode, clearTableSelection, onClose])

  const toggleTableColumnIsHeader = useCallback(() => {
    editor.update(() => {
      const tableNode = $getTableNodeFromLexicalNodeOrThrow(tableCellNode)

      const tableColumnIndex = $getTableColumnIndexFromTableCellNode(tableCellNode)

      const tableRows = tableNode.getChildren()

      for (let r = 0; r < tableRows.length; r++) {
        const tableRow = tableRows[r]

        if (!$isTableRowNode(tableRow)) {
          throw new Error("Expected table row")
        }

        const tableCells = tableRow.getChildren()

        if (tableColumnIndex >= tableCells.length || tableColumnIndex < 0) {
          throw new Error("Expected table cell to be inside of table row.")
        }

        const tableCell = tableCells[tableColumnIndex]

        if (!$isTableCellNode(tableCell)) {
          throw new Error("Expected table cell")
        }

        tableCell.toggleHeaderStyle(TableCellHeaderStates.COLUMN)
      }

      clearTableSelection()
      onClose()
    })
  }, [editor, tableCellNode, clearTableSelection, onClose])

  const handleCellBackgroundColor = useCallback(
    (value: string) => {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection) || $isGridSelection(selection)) {
          const [cell] = $getNodeTriplet(selection.anchor)
          if ($isTableCellNode(cell)) {
            cell.setBackgroundColor(value)
          }
        }
      })
    },
    [editor],
  )

  let mergeCellButton: null | JSX.Element = null
  if (cellMerge) {
    if (canMergeCells) {
      mergeCellButton = (
        <button
          className={stylesDropdown.dropdownItem}
          data-test-id="table-merge-cells"
          onClick={() => mergeTableCellsAtSelection()}
        >
          {t("Merge cells")}
        </button>
      )
    } else if (canUnmergeCell) {
      mergeCellButton = (
        <button
          className={stylesDropdown.dropdownItem}
          data-test-id="table-unmerge-cells"
          onClick={() => unmergeTableCellsAtSelection()}
        >
          {t("Unmerge cells")}
        </button>
      )
    }
  }

  return createPortal(
    <div
      className={stylesDropdown.dropdown}
      onClick={(e) => {
        e.stopPropagation()
      }}
      ref={dropDownRef}
    >
      {mergeCellButton}
      <button
        className={stylesDropdown.dropdownItem}
        data-test-id="table-background-color"
        onClick={() =>
          showColorPickerModal("Cell background color", () => (
            <ColorPicker color={backgroundColor} onChange={handleCellBackgroundColor} />
          ))
        }
      >
        <span className={stylesDropdown.dropdownText}>{t("Background Color")}</span>
      </button>
      <hr />
      <button
        className={stylesDropdown.dropdownItem}
        data-test-id="table-insert-row-above"
        onClick={() => insertTableRowAtSelection(false)}
      >
        <span className={stylesDropdown.dropdownText}>
          Insert {selectionCounts.rows === 1 ? "row" : `${selectionCounts.rows} rows`} above
        </span>
      </button>
      <button
        className={stylesDropdown.dropdownItem}
        data-test-id="table-insert-row-below"
        onClick={() => insertTableRowAtSelection(true)}
      >
        <span className={stylesDropdown.dropdownText}>
          Insert {selectionCounts.rows === 1 ? "row" : `${selectionCounts.rows} rows`} below
        </span>
      </button>
      <hr />
      <button
        className={stylesDropdown.dropdownItem}
        data-test-id="table-insert-column-before"
        onClick={() => insertTableColumnAtSelection(false)}
      >
        <span className={stylesDropdown.dropdownText}>
          Insert {selectionCounts.columns === 1 ? "column" : `${selectionCounts.columns} columns`}{" "}
          left
        </span>
      </button>
      <button
        className={stylesDropdown.dropdownItem}
        data-test-id="table-insert-column-after"
        onClick={() => insertTableColumnAtSelection(true)}
      >
        <span className={stylesDropdown.dropdownText}>
          Insert {selectionCounts.columns === 1 ? "column" : `${selectionCounts.columns} columns`}{" "}
          right
        </span>
      </button>
      <hr />
      <button
        className={stylesDropdown.dropdownItem}
        data-test-id="table-delete-columns"
        onClick={() => deleteTableColumnAtSelection()}
      >
        <span className={stylesDropdown.dropdownText}>{t("Delete column")}</span>
      </button>
      <button
        className={stylesDropdown.dropdownItem}
        data-test-id="table-delete-rows"
        onClick={() => deleteTableRowAtSelection()}
      >
        <span className={stylesDropdown.dropdownText}>{t("Delete row")}</span>
      </button>
      <button
        className={stylesDropdown.dropdownItem}
        data-test-id="table-delete"
        onClick={() => deleteTableAtSelection()}
      >
        <span className={stylesDropdown.dropdownText}>{t("Delete table")}</span>
      </button>
      <hr />
      <button className={stylesDropdown.dropdownItem} onClick={() => toggleTableRowIsHeader()}>
        <span className={stylesDropdown.dropdownText}>
          {(tableCellNode.__headerState & TableCellHeaderStates.ROW) === TableCellHeaderStates.ROW
            ? t("Remove row header")
            : t("Add row header")}
        </span>
      </button>
      <button className={stylesDropdown.dropdownItem} onClick={() => toggleTableColumnIsHeader()}>
        <span className={stylesDropdown.dropdownText}>
          {(tableCellNode.__headerState & TableCellHeaderStates.COLUMN) ===
          TableCellHeaderStates.COLUMN
            ? t("Remove column header")
            : t("Add column header")}
        </span>
      </button>
    </div>,
    document.body,
  )
}
