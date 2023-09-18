import React from "react"
import styles from "./ButtonEdit.module.scss"

type ButtonEditProps = {
  onClick: () => void
}

export const ButtonEdit = ({ onClick }: ButtonEditProps) => {
  return (
    <div
      aria-label="edit"
      className={styles.linkEdit}
      onClick={onClick}
      onMouseDown={(event) => event.preventDefault()}
      role="button"
      tabIndex={0}
    />
  )
}
