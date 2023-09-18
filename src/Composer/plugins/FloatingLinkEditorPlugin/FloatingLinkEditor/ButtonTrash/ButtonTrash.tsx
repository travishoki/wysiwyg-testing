import React from "react"
import styles from "./ButtonTrash.module.scss"

type ButtonTrashProps = {
  onClick: () => void
}

export const ButtonTrash = ({ onClick }: ButtonTrashProps) => {
  return (
    <div
      aria-label="trash"
      className={styles.linkTrash}
      onClick={onClick}
      onMouseDown={(event) => event.preventDefault()}
      role="button"
      tabIndex={0}
    />
  )
}
