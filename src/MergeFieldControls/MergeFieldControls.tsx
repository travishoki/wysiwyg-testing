import React from "react"
import { MergeFieldButton } from "./MergeFieldButton/MergeFieldButton"
import { mergeFieldIdArray, mergeFieldObject } from "./MergeFieldControls.const"
import styles from "./MergeFieldControls.module.scss"

type MergeFieldControlsProps = {
  onClick: (mergeFieldObject: mergeFieldObject) => void
}

export const MergeFieldControls = ({ onClick }: MergeFieldControlsProps) => {
  return (
    <div className={styles.mergeFieldControls}>
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
