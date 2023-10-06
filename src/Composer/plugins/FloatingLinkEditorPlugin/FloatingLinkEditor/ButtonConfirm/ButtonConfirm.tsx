import React from "react"
import { useTranslation } from "src/i18n"
import { ButtonIcon } from "../ButtonIcon/ButtonIcon"
import styles from "./ButtonConfirm.module.scss"

type ButtonConfirmProps = {
  onClick: () => void
}

export const ButtonConfirm = ({ onClick }: ButtonConfirmProps) => {
  const { t: tCommon } = useTranslation("common")

  return (
    <ButtonIcon
      aria-label={tCommon("Confirm")}
      className={styles.linkConfirm}
      onClick={onClick}
      onMouseDown={(event) => event.preventDefault()}
      role="button"
      tabIndex={0}
    />
  )
}
