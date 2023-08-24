import React from "react"
import { MergeFieldButton } from "./MergeFieldButton/MergeFieldButton"
import { mergeFieldNameArray, mergeFieldObject } from "./MergeFieldControls.const"
import styles from "./MergeFieldControls.module.scss"

type MergeFieldControlsProps = {
  onClick: (mergeFieldObject: mergeFieldObject) => void
}

export const MergeFieldControls = ({ onClick }: MergeFieldControlsProps) => {
  return (
    <div className={styles.mergeFieldControls}>
      {mergeFieldNameArray.map((mergeField) => (
        <MergeFieldButton key={mergeField.id} mergeField={mergeField} onClick={onClick} />
      ))}
    </div>
  )
}
