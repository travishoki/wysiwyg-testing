import React from "react"
import styles from "./ButtonCancel.module.scss"

type ButtonCancelProps = {
  onClick: () => void
}

export const ButtonCancel = ({ onClick }: ButtonCancelProps) => {
  return (
    <div
      aria-label="cancel"
      className={styles.linkCancel}
      onClick={onClick}
      onMouseDown={(event) => event.preventDefault()}
      role="button"
      tabIndex={0}
    />
  )
}
