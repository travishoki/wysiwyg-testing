import React from "react"
import classNames from "classnames"
import { IconButton } from "../IconButton/IconButton"
import stylesToolbarPlugin from "../ToolbarPlugin.module.scss"

type ButtonLinkProps = {
  isActive: boolean
  isEditable: boolean
  onClick: () => void
}

export const ButtonLink = ({ isActive, isEditable, onClick }: ButtonLinkProps) => {
  return (
    <button
      aria-label="Insert link"
      className={classNames(
        stylesToolbarPlugin.toolbarItem,
        stylesToolbarPlugin.spaced,
        isActive ? stylesToolbarPlugin.activeButton : "",
      )}
      disabled={!isEditable}
      onClick={onClick}
      title="Insert link"
      type="button"
    >
      <IconButton disabled={!isEditable} type="link" />
    </button>
  )
}
