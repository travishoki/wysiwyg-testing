import React from "react"
import classNames from "classnames"
import { IS_APPLE } from "../../../shared/environment"
import { IconButton } from "../IconButton/IconButton"
import stylesToolbarPlugin from "../ToolbarPlugin.module.scss"

type ButtonUndoProps = {
  canUndo: boolean
  isEditable: boolean
  onClick: () => void
}

export const ButtonUndo = ({ canUndo, isEditable, onClick }: ButtonUndoProps) => {
  return (
    <button
      aria-label="Undo"
      className={classNames(stylesToolbarPlugin.toolbarItem, stylesToolbarPlugin.spaced)}
      disabled={!canUndo || !isEditable}
      onClick={onClick}
      title={IS_APPLE ? "Undo (⌘Z)" : "Undo (Ctrl+Z)"}
      type="button"
    >
      <IconButton disabled={!canUndo || !isEditable} type="undo" />
    </button>
  )
}
