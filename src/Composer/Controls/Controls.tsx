import React from "react"
import styles from "./Controls.module.scss"
import { LockButton } from "./LockButton/LockButton"

export const Controls = () => (
  <div className={styles.controls}>
    <LockButton />
  </div>
)
