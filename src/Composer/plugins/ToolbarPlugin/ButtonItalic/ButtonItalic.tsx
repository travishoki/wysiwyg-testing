import React from "react"
import classNames from "classnames"
import { useTranslation } from "src/i18n"
import { IS_APPLE } from "../../../shared/environment"
import { IconButton } from "../IconButton/IconButton"
import stylesToolbarPlugin from "../ToolbarPlugin.module.scss"

type ButtonItalicProps = {
  isActive: boolean
  isEditable: boolean
  onClick: () => void
}

const shortcut = IS_APPLE ? "⌘I" : "Ctrl+I"

export const ButtonItalic = ({ isActive, isEditable, onClick }: ButtonItalicProps) => {
  const { t } = useTranslation("scenes", { keyPrefix: "composer" })

  return (
    <button
      aria-label={`${t("Format text as italics.")} ${t("Shortcut")}: ${shortcut}}`}
      className={classNames(
        stylesToolbarPlugin.toolbarItem,
        stylesToolbarPlugin.spaced,
        isActive ? stylesToolbarPlugin.activeButton : "",
      )}
      disabled={!isEditable}
      onClick={onClick}
      title={`${t("Italic")} (${shortcut})`}
      type="button"
    >
      <IconButton disabled={!isEditable} type="italic" />
    </button>
  )
}
