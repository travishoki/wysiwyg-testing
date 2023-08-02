import * as React from "react"

import { SubmitButton } from "./SubmitButton/SubmitButton"
import "./Controls.css"

export const Controls = ({ onSubmit }: ControlsProps) => (
  <div className="controls">
    <SubmitButton onSubmit={onSubmit} />
  </div>
)

type ControlsProps = {
  onSubmit: (value: string) => void
}
