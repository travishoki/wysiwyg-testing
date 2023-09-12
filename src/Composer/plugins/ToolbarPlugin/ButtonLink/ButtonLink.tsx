import React from "react"
import classNames from "classnames"
import { useTranslation } from "src/i18n"
import { IconButton } from "../IconButton/IconButton"
import stylesToolbarPlugin from "../ToolbarPlugin.module.scss"

type ButtonLinkProps = {
  isActive: boolean
  isEditable: boolean
  onClick: () => void
}

export const ButtonLink = ({ isActive, isEditable, onClick }: ButtonLinkProps) => {
  const { t } = useTranslation("scenes", { keyPrefix: "composer" })

  return (
    <button
      aria-label={t("Insert link")}
      className={classNames(
        stylesToolbarPlugin.toolbarItem,
        stylesToolbarPlugin.spaced,
        isActive ? stylesToolbarPlugin.activeButton : "",
      )}
      disabled={!isEditable}
      onClick={onClick}
      title={t("Insert link")}
      type="button"
    >
      <IconButton disabled={!isEditable} type="link" />
    </button>
  )
}
