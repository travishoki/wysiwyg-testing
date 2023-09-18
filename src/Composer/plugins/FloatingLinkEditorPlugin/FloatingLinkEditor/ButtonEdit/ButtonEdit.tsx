import React from "react"
import { ButtonIcon } from "../ButtonIcon/ButtonIcon"
import styles from "./ButtonEdit.module.scss"

type ButtonEditProps = {
  onClick: () => void
}

export const ButtonEdit = ({ onClick }: ButtonEditProps) => {
  return (
    <ButtonIcon
      aria-label="edit"
      className={styles.linkEdit}
      onClick={onClick}
      onMouseDown={(event) => event.preventDefault()}
    />
  )
}
