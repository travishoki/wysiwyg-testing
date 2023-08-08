import * as React from "react"

import { MergeFieldButton } from "./MergeFieldButton/MergeFieldButton"
import { SubmitButton } from "./SubmitButton/SubmitButton"
import "./Controls.css"

export const Controls = ({ onSubmit }: ControlsProps) => (
  <div className="controls">
    <SubmitButton onSubmit={onSubmit} />
    <MergeFieldButton />
  </div>
)

type ControlsProps = {
  onSubmit: (value: string) => void
}
