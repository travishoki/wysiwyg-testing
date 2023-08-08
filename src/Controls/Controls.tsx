import * as React from "react"

import { MergeFieldButton } from "./MergeFieldButton/MergeFieldButton"
import { SubmitButton } from "./SubmitButton/SubmitButton"
import { mergeFieldKeyArray } from "./const"
import "./Controls.css"

export const Controls = ({ onSubmit }: ControlsProps) => (
  <div className="controls">
    <SubmitButton onSubmit={onSubmit} />

    {mergeFieldKeyArray.map((mergeFieldKey) => (
      <MergeFieldButton
        key={mergeFieldKey.key}
        mergeFieldIconUrl={mergeFieldKey.iconUrl}
        mergeFieldKey={mergeFieldKey.key}
      />
    ))}
  </div>
)

type ControlsProps = {
  onSubmit: (value: string) => void
}
