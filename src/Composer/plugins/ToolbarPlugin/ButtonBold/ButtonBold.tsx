import React from "react"
import classNames from "classnames"
import { useTranslation } from "i18n"
import { IS_APPLE } from "../../../shared/environment"
import { IconButton } from "../IconButton/IconButton"
import stylesToolbarPlugin from "../ToolbarPlugin.module.scss"

type ButtonBoldProps = {
  isActive: boolean
  isEditable: boolean
  onClick: () => void
}

export const ButtonBold = ({ isActive, isEditable, onClick }: ButtonBoldProps) => {
  const { t } = useTranslation("scenes", { keyPrefix: "composer" })

  const shortcut = IS_APPLE ? "⌘B" : "Ctrl+B"

  return (
    <button
      aria-label={`${t("Format text as bold.")} ${t("Shortcut")}: ${shortcut}}`}
      className={classNames(
        stylesToolbarPlugin.toolbarItem,
        stylesToolbarPlugin.spaced,
        isActive ? stylesToolbarPlugin.activeButton : "",
      )}
      disabled={!isEditable}
      onClick={onClick}
      title={`${t("Bold")} (${shortcut})`}
      type="button"
    >
      <IconButton disabled={!isEditable} type="bold" />
    </button>
  )
}
