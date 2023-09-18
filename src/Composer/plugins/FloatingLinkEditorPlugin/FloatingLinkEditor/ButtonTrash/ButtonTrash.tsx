import React from "react"
import { ButtonIcon } from "../ButtonIcon/ButtonIcon"
import styles from "./ButtonTrash.module.scss"

type ButtonTrashProps = {
  onClick: () => void
}

export const ButtonTrash = ({ onClick }: ButtonTrashProps) => {
  return (
    <ButtonIcon
      aria-label="trash"
      className={styles.linkTrash}
      onClick={onClick}
      onMouseDown={(event) => event.preventDefault()}
    />
  )
}
