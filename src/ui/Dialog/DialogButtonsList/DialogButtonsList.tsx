import React from "react"
import { DialogProps } from "../types"
import styles from "./DialogButtonsList.module.scss"

export const DialogButtonsList = ({ children }: DialogProps) => {
  return <div className={styles.DialogButtonsList}>{children}</div>
}
