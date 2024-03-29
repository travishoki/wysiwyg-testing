import React from "react"
import classNames from "classnames"
import { useTranslation } from "src/i18n"
import { IS_APPLE } from "../../../shared/environment"
import { IconButton } from "../IconButton/IconButton"
import stylesToolbarPlugin from "../ToolbarPlugin.module.scss"

type ButtonRedoProps = {
  canRedo: boolean
  isEditable: boolean
  onClick: () => void
}

export const ButtonRedo = ({ canRedo, isEditable, onClick }: ButtonRedoProps) => {
  const { t } = useTranslation("scenes", { keyPrefix: "composer" })
  const shortcut = IS_APPLE ? t("⌘Y") : t("Ctrl+Y")

  return (
    <button
      aria-label={t("Redo")}
      className={classNames(stylesToolbarPlugin.toolbarItem)}
      disabled={!canRedo || !isEditable}
      onClick={onClick}
      title={`${t("Redo")} (${shortcut})`}
      type="button"
    >
      <IconButton disabled={!canRedo || !isEditable} type="redo" />
    </button>
  )
}
