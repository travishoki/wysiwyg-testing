import React from "react"
import { useTranslation } from "src/i18n"
import { ButtonIcon } from "../ButtonIcon/ButtonIcon"
import styles from "./ButtonCancel.module.scss"

type ButtonCancelProps = {
  onClick: () => void
}

export const ButtonCancel = ({ onClick }: ButtonCancelProps) => {
  const { t: tCommon } = useTranslation("common")

  return (
    <ButtonIcon
      aria-label={tCommon("Cancel")}
      className={styles.linkCancel}
      onClick={onClick}
      onMouseDown={(event) => event.preventDefault()}
      role="button"
      tabIndex={0}
    />
  )
}
