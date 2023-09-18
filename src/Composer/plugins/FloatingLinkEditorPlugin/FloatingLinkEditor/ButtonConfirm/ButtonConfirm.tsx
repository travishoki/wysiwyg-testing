import React from "react"
import styles from "./ButtonConfirm.module.scss"

type ButtonConfirmProps = {
  onClick: () => void
}

export const ButtonConfirm = ({ onClick }: ButtonConfirmProps) => {
  return (
    <div
      aria-label="confim"
      className={styles.linkConfirm}
      onClick={onClick}
      onMouseDown={(event) => event.preventDefault()}
      role="button"
      tabIndex={0}
    />
  )
}
