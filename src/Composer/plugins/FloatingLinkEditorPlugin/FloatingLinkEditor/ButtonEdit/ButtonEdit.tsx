import React from "react"
import { useTranslation } from "src/i18n"
import { ButtonIcon } from "../ButtonIcon/ButtonIcon"
import styles from "./ButtonEdit.module.scss"

type ButtonEditProps = {
  onClick: () => void
}

export const ButtonEdit = ({ onClick }: ButtonEditProps) => {
  const { t: tCommon } = useTranslation("common")

  return (
    <ButtonIcon
      aria-label={tCommon("Edit")}
      className={styles.linkEdit}
      onClick={onClick}
      onMouseDown={(event) => event.preventDefault()}
    />
  )
}
