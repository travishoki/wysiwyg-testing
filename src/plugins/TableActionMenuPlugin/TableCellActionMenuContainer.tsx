import React, { useCallback, useEffect, useRef, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getTableCellNodeFromLexicalNode, TableCellNode } from "@lexical/table"
import classNames from "classnames"
import { $getSelection, $isRangeSelection } from "lexical"
import { IconBare } from "../../Icon/IconBare"
import { useModal } from "../../hooks/useModal"
import { TableActionMenu } from "./TableActionMenu"
import styles from "./TableCellActionMenuContainer.module.scss"

type TableCellActionMenuContainerProps = {
  anchorElem: HTMLElement
  cellMerge: boolean
}

export const TableCellActionMenuContainer = ({
  anchorElem,
  cellMerge,
}: TableCellActionMenuContainerProps) => {
  const [editor] = useLexicalComposerContext()

  const menuButtonRef = useRef(null)
  const menuRootRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const [tableCellNode, setTableMenuCellNode] = useState<TableCellNode | null>(null)

  const [colorPickerModal, showColorPickerModal] = useModal()

  const moveMenu = useCallback(() => {
    const menu = menuButtonRef.current
    const selection = $getSelection()
    const nativeSelection = window.getSelection()
    const activeElement = document.activeElement

    if (selection == null || menu == null) {
      setTableMenuCellNode(null)

      return
    }

    const rootElement = editor.getRootElement()

    if (
      $isRangeSelection(selection) &&
      rootElement !== null &&
      nativeSelection !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const tableCellNodeFromSelection = $getTableCellNodeFromLexicalNode(
        selection.anchor.getNode(),
      )

      if (tableCellNodeFromSelection == null) {
        setTableMenuCellNode(null)

        return
      }

      const tableCellParentNodeDOM = editor.getElementByKey(tableCellNodeFromSelection.getKey())

      if (tableCellParentNodeDOM == null) {
        setTableMenuCellNode(null)

        return
      }

      setTableMenuCellNode(tableCellNodeFromSelection)
    } else if (!activeElement) {
      setTableMenuCellNode(null)
    }
  }, [editor])

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.getEditorState().read(() => {
        moveMenu()
      })
    })
  })

  useEffect(() => {
    const menuButtonDOM = menuButtonRef.current as HTMLButtonElement | null

    if (menuButtonDOM != null && tableCellNode != null) {
      const tableCellNodeDOM = editor.getElementByKey(tableCellNode.getKey())

      if (tableCellNodeDOM != null) {
        const tableCellRect = tableCellNodeDOM.getBoundingClientRect()
        const menuRect = menuButtonDOM.getBoundingClientRect()
        const anchorRect = anchorElem.getBoundingClientRect()

        const top = tableCellRect.top - anchorRect.top + 4
        const left = tableCellRect.right - menuRect.width - 10 - anchorRect.left

        menuButtonDOM.style.opacity = "1"
        menuButtonDOM.style.transform = `translate(${left}px, ${top}px)`
      } else {
        menuButtonDOM.style.opacity = "0"
        menuButtonDOM.style.transform = "translate(-10000px, -10000px)"
      }
    }
  }, [menuButtonRef, tableCellNode, editor, anchorElem])

  const prevTableCellDOM = useRef(tableCellNode)

  useEffect(() => {
    if (prevTableCellDOM.current !== tableCellNode) {
      setIsMenuOpen(false)
    }

    prevTableCellDOM.current = tableCellNode
  }, [prevTableCellDOM, tableCellNode])

  return (
    <div className={styles["table-cell-action-button-container"]} ref={menuButtonRef}>
      {tableCellNode != null && (
        <>
          <button
            className={classNames(styles["table-cell-action-button"], "chevron-down")}
            onClick={(e) => {
              e.stopPropagation()
              setIsMenuOpen(!isMenuOpen)
            }}
            ref={menuRootRef}
          >
            <IconBare type="chevron-down" />
          </button>
          {colorPickerModal}
          {isMenuOpen && (
            <TableActionMenu
              cellMerge={cellMerge}
              contextRef={menuRootRef}
              onClose={() => setIsMenuOpen(false)}
              setIsMenuOpen={setIsMenuOpen}
              showColorPickerModal={showColorPickerModal}
              tableCellNode={tableCellNode}
            />
          )}
        </>
      )}
    </div>
  )
}
