import * as React from "react"

import { MergeFieldButton } from "./MergeFieldButton/MergeFieldButton"
import { SubmitButton } from "./SubmitButton/SubmitButton"
import { mergeFieldArray } from "./const"
import "./Controls.css"

export const Controls = ({ onSubmit }: ControlsProps) => (
  <div className="controls">
    <SubmitButton onSubmit={onSubmit} />

    {mergeFieldArray.map((mergeFieldItem) => (
      <MergeFieldButton key={mergeFieldItem.key} mergeFieldItem={mergeFieldItem} />
    ))}
  </div>
)

type ControlsProps = {
  onSubmit: (value: string) => void
}
