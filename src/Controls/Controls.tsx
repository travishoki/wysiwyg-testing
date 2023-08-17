import React from "react"
import styles from "./Controls.module.scss"
import { LockButton } from "./LockButton/LockButton"
import { SubmitButton } from "./SubmitButton/SubmitButton"

type ControlsProps = {
  onSubmit: (value: string) => void
}

export const Controls = ({ onSubmit }: ControlsProps) => (
  <div className={styles.controls}>
    <SubmitButton onSubmit={onSubmit} />
    <LockButton />
  </div>
)
