import React from "react"
import classNames from "classnames"
import { IconFormat } from "../../../Icon/IconFormat/IconFormat"
import { IS_APPLE } from "../../../shared/environment"
import stylesToolbarPlugin from "../ToolbarPlugin.module.scss"

type ButtonBoldProps = {
  isBold: boolean
  isEditable: boolean
  onClick: () => void
}

export const ButtonBold = ({ isBold, isEditable, onClick }: ButtonBoldProps) => {
  return (
    <button
      aria-label={`Format text as bold. Shortcut: ${IS_APPLE ? "⌘B" : "Ctrl+B"}`}
      className={classNames(
        stylesToolbarPlugin.toolbarItem,
        stylesToolbarPlugin.spaced,
        isBold ? stylesToolbarPlugin.activeButton : "",
      )}
      disabled={!isEditable}
      onClick={onClick}
      title={IS_APPLE ? "Bold (⌘B)" : "Bold (Ctrl+B)"}
      type="button"
    >
      <IconFormat type="bold" />
    </button>
  )
}
