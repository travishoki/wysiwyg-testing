import * as React from "react"
import { LockButton } from "./LockButton/LockButton"
import { SubmitButton } from "./SubmitButton/SubmitButton"
import "./Controls.css"

type ControlsProps = {
  onSubmit: (value: string) => void
}

export const Controls = ({ onSubmit }: ControlsProps) => (
  <div className="controls">
    <SubmitButton onSubmit={onSubmit} />
    <LockButton />
  </div>
)
