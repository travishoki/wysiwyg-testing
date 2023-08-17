import React from "react"
import styles from "./DialogButtonsList.module.scss"
import { DialogProps } from "./types"

export const DialogButtonsList = ({ children }: DialogProps) => {
  return <div className={styles.DialogButtonsList}>{children}</div>
}
