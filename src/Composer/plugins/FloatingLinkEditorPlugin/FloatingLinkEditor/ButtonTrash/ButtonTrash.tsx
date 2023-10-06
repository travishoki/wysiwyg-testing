import React from "react"
import { useTranslation } from "src/i18n"
import { ButtonIcon } from "../ButtonIcon/ButtonIcon"
import styles from "./ButtonTrash.module.scss"

type ButtonTrashProps = {
  onClick: () => void
}

export const ButtonTrash = ({ onClick }: ButtonTrashProps) => {
  const { t: tCommon } = useTranslation("common")

  return (
    <ButtonIcon
      aria-label={tCommon("Delete")}
      className={styles.linkTrash}
      onClick={onClick}
      onMouseDown={(event) => event.preventDefault()}
    />
  )
}
