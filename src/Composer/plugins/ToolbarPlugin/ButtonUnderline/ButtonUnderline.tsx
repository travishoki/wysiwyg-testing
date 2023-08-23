import React from "react"
import classNames from "classnames"
import { IS_APPLE } from "../../../shared/environment"
import { IconButton } from "../IconButton/IconButton"
import stylesToolbarPlugin from "../ToolbarPlugin.module.scss"

type ButtonUnderlineProps = {
  isActive: boolean
  isEditable: boolean
  onClick: () => void
}

export const ButtonUnderline = ({ isActive, isEditable, onClick }: ButtonUnderlineProps) => {
  return (
    <button
      aria-label={`Format text to underlined. Shortcut: ${IS_APPLE ? "⌘U" : "Ctrl+U"}`}
      className={classNames(
        stylesToolbarPlugin.toolbarItem,
        stylesToolbarPlugin.spaced,
        isActive ? stylesToolbarPlugin.activeButton : "",
      )}
      disabled={!isEditable}
      onClick={onClick}
      title={IS_APPLE ? "Underline (⌘U)" : "Underline (Ctrl+U)"}
      type="button"
    >
      <IconButton disabled={!isEditable} type="underline" />
    </button>
  )
}
