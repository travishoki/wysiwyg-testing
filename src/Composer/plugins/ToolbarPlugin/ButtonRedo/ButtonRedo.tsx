import React from "react"
import classNames from "classnames"
import { IS_APPLE } from "../../../shared/environment"
import { IconButton } from "../IconButton/IconButton"
import stylesToolbarPlugin from "../ToolbarPlugin.module.scss"

type ButtonRedoProps = {
  canRedo: boolean
  isEditable: boolean
  onClick: () => void
}

export const ButtonRedo = ({ canRedo, isEditable, onClick }: ButtonRedoProps) => {
  return (
    <button
      aria-label="Redo"
      className={classNames(stylesToolbarPlugin.toolbarItem)}
      disabled={!canRedo || !isEditable}
      onClick={onClick}
      title={IS_APPLE ? "Redo (⌘Y)" : "Redo (Ctrl+Y)"}
      type="button"
    >
      <IconButton disabled={!canRedo || !isEditable} type="redo" />
    </button>
  )
}
