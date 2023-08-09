import * as React from "react"

import { LockButton } from "./LockButton/LockButton"
import { SubmitButton } from "./SubmitButton/SubmitButton"
import "./Controls.css"

export const Controls = ({ onSubmit }: ControlsProps) => (
  <div className="controls">
    <SubmitButton onSubmit={onSubmit} />
    <LockButton />
  </div>
)

type ControlsProps = {
  onSubmit: (value: string) => void
}
