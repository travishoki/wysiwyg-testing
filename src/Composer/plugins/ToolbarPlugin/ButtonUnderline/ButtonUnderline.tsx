import React from "react"
import classNames from "classnames"
import { useTranslation } from "i18n"
import { IS_APPLE } from "../../../shared/environment"
import { IconButton } from "../IconButton/IconButton"
import stylesToolbarPlugin from "../ToolbarPlugin.module.scss"

type ButtonUnderlineProps = {
  isActive: boolean
  isEditable: boolean
  onClick: () => void
}

export const ButtonUnderline = ({ isActive, isEditable, onClick }: ButtonUnderlineProps) => {
  const { t } = useTranslation("scenes", { keyPrefix: "composer" })

  const shortcut = IS_APPLE ? "⌘U" : "Ctrl+U"

  return (
    <button
      aria-label={`${t("Format text to underlined.")} ${t("Shortcut")}: ${shortcut}}`}
      className={classNames(
        stylesToolbarPlugin.toolbarItem,
        stylesToolbarPlugin.spaced,
        isActive ? stylesToolbarPlugin.activeButton : "",
      )}
      disabled={!isEditable}
      onClick={onClick}
      title={`${t("Underline")} (${shortcut})`}
      type="button"
    >
      <IconButton disabled={!isEditable} type="underline" />
    </button>
  )
}
