import React from "react"
import styles from "./ButtonClose.module.scss"

type ButtonCloseProps = {
  onClick: () => void
}

export const ButtonClose = ({ onClick }: ButtonCloseProps) => {
  return (
    <button aria-label="Close modal" className={styles.closeButton} onClick={onClick} type="button">
      X
    </button>
  )
}
