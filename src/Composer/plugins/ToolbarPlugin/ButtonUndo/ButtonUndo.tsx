import React from "react"
import classNames from "classnames"
import { useTranslation } from "src/i18n"
import { IS_APPLE } from "../../../shared/environment"
import { IconButton } from "../IconButton/IconButton"
import stylesToolbarPlugin from "../ToolbarPlugin.module.scss"

type ButtonUndoProps = {
  canUndo: boolean
  isEditable: boolean
  onClick: () => void
}

export const ButtonUndo = ({ canUndo, isEditable, onClick }: ButtonUndoProps) => {
  const { t } = useTranslation("scenes", { keyPrefix: "composer" })
  const shortcut = IS_APPLE ? t("⌘Z") : t("Ctrl+Z")

  return (
    <button
      aria-label={t("Undo")}
      className={classNames(stylesToolbarPlugin.toolbarItem, stylesToolbarPlugin.spaced)}
      disabled={!canUndo || !isEditable}
      onClick={onClick}
      title={`${t("Undo")} (${shortcut})`}
      type="button"
    >
      <IconButton disabled={!canUndo || !isEditable} type="undo" />
    </button>
  )
}
