import React from "react"
import classNames from "classnames"
import { IconButton } from "../IconButton/IconButton"
import stylesToolbarPlugin from "../ToolbarPlugin.module.scss"

type ButtonCodeProps = {
  isActive: boolean
  isEditable: boolean
  onClick: () => void
}

export const ButtonCode = ({ isActive, isEditable, onClick }: ButtonCodeProps) => {
  return (
    <button
      aria-label="Insert code block"
      className={classNames(
        stylesToolbarPlugin.toolbarItem,
        stylesToolbarPlugin.spaced,
        isActive ? stylesToolbarPlugin.activeButton : "",
      )}
      disabled={!isEditable}
      onClick={onClick}
      title="Insert code block"
      type="button"
    >
      <IconButton type="code" />
    </button>
  )
}
