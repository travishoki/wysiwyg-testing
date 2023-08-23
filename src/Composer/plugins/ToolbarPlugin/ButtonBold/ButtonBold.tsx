import React from "react"
import classNames from "classnames"
import { IS_APPLE } from "../../../shared/environment"
import { IconToolbarButton } from "../IconToolbarButton/IconToolbarButton"
import stylesToolbarPlugin from "../ToolbarPlugin.module.scss"

type ButtonBoldProps = {
  isActive: boolean
  isEditable: boolean
  onClick: () => void
}

export const ButtonBold = ({ isActive, isEditable, onClick }: ButtonBoldProps) => {
  return (
    <button
      aria-label={`Format text as bold. Shortcut: ${IS_APPLE ? "⌘B" : "Ctrl+B"}`}
      className={classNames(
        stylesToolbarPlugin.toolbarItem,
        stylesToolbarPlugin.spaced,
        isActive ? stylesToolbarPlugin.activeButton : "",
      )}
      disabled={!isEditable}
      onClick={onClick}
      title={IS_APPLE ? "Bold (⌘B)" : "Bold (Ctrl+B)"}
      type="button"
    >
      <IconToolbarButton type="bold" />
    </button>
  )
}
