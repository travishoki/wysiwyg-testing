import * as React from "react"

import { MergeFieldButton } from "./MergeFieldButton/MergeFieldButton"
import { mergeFieldKeyArray, mergeFieldObject } from "./const"
import "./MergeFieldControls.css"

export const MergeFieldControls = ({ onClick }: MergeFieldControlsProps) => {
  return (
    <div className="merge-field-controls">
      {mergeFieldKeyArray.map((mergeFieldKey) => (
        <MergeFieldButton
          key={mergeFieldKey.key}
          mergeFieldIconUrl={mergeFieldKey.iconUrl}
          mergeFieldKey={mergeFieldKey.key}
          onClick={onClick}
        />
      ))}
    </div>
  )
}

type MergeFieldControlsProps = {
  onClick: (mergeFieldObject: mergeFieldObject) => void
}
