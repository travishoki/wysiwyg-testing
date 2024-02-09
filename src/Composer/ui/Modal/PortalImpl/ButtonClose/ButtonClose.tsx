import React from "react"
import { useTranslation } from "src/i18n"
import styles from "./ButtonClose.module.scss"

type ButtonCloseProps = {
  onClick: () => void
}

export const ButtonClose = ({ onClick }: ButtonCloseProps) => {
  const { t } = useTranslation("common")

  return (
    <button aria-label={t("Close")} className={styles.closeButton} onClick={onClick} type="button">
      X
    </button>
  )
}
