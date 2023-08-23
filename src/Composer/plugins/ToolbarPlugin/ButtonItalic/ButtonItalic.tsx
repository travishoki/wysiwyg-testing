import React from "react"
import classNames from "classnames"
import { IconFormat } from "../../../Icon/IconFormat/IconFormat"
import { IS_APPLE } from "../../../shared/environment"
import stylesToolbarPlugin from "../ToolbarPlugin.module.scss"

type ButtonItalicProps = {
  isActive: boolean
  isEditable: boolean
  onClick: () => void
}

export const ButtonItalic = ({ isActive, isEditable, onClick }: ButtonItalicProps) => {
  return (
    <button
      aria-label={`Format text as italics. Shortcut: ${IS_APPLE ? "⌘I" : "Ctrl+I"}`}
      className={classNames(
        stylesToolbarPlugin.toolbarItem,
        stylesToolbarPlugin.spaced,
        isActive ? stylesToolbarPlugin.activeButton : "",
      )}
      disabled={!isEditable}
      onClick={onClick}
      title={IS_APPLE ? "Italic (⌘I)" : "Italic (Ctrl+I)"}
      type="button"
    >
      <IconFormat type="italic" />
    </button>
  )
}
