import React from "react"
import { MergeFieldButton } from "./MergeFieldButton/MergeFieldButton"
import { mergeFieldNameArray, MergeField } from "./MergeFieldControls.const"
import styles from "./MergeFieldControls.module.scss"

type MergeFieldControlsProps = {
  onClick: (mergeField: MergeField) => void
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
