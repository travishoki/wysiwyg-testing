import * as React from "react"
import { LockButton } from "./LockButton/LockButton"
import { SubmitButton } from "./SubmitButton/SubmitButton"
import styles from "./Controls.module.scss"

type ControlsProps = {
  onSubmit: (value: string) => void
}

export const Controls = ({ onSubmit }: ControlsProps) => (
  <div className={styles.controls}>
    <SubmitButton onSubmit={onSubmit} />
    <LockButton />
  </div>
)
