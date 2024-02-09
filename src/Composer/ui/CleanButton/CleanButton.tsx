import React from "react"
import styles from "./CleanButton.module.scss"

type CleanButtonProps = Readonly<{
  isDirty: boolean
}>

export const CleanButton = ({ isDirty }: CleanButtonProps) => {
  return <p className={styles.paragraph}>{isDirty ? "Dirty" : "Clean"}</p>
}
