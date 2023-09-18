import React from "react"
import { ButtonIcon } from "../ButtonIcon/ButtonIcon"
import styles from "./ButtonCancel.module.scss"

type ButtonCancelProps = {
  onClick: () => void
}

export const ButtonCancel = ({ onClick }: ButtonCancelProps) => {
  return (
    <ButtonIcon
      aria-label="cancel"
      className={styles.linkCancel}
      onClick={onClick}
      onMouseDown={(event) => event.preventDefault()}
      role="button"
      tabIndex={0}
    />
  )
}
