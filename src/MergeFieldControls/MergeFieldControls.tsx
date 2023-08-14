import * as React from "react"
import { MergeFieldButton } from "./MergeFieldButton/MergeFieldButton"
import { mergeFieldIdArray, mergeFieldObject } from "./const"
import "./MergeFieldControls.css"

export const MergeFieldControls = ({ onClick }: MergeFieldControlsProps) => {
  return (
    <div className="merge-field-controls">
      {mergeFieldIdArray.map((mergeField) => (
        <MergeFieldButton
          key={mergeField.id}
          mergeFieldIconUrl={mergeField.iconUrl}
          mergeFieldId={mergeField.id}
          onClick={onClick}
        />
      ))}
    </div>
  )
}

type MergeFieldControlsProps = {
  onClick: (mergeFieldObject: mergeFieldObject) => void
}
