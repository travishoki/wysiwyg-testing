import * as React from "react"

import { HokiButton } from "./HokiButton/HokiButton"
import { SubmitButton } from "./SubmitButton/SubmitButton"
import "./Controls.css"

export const Controls = ({ onSubmit }: ControlsProps) => (
  <div className="controls">
    <SubmitButton onSubmit={onSubmit} />
    <HokiButton />
  </div>
)

type ControlsProps = {
  onSubmit: (value: string) => void
}
