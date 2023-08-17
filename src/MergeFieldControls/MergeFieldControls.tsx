import React from "react"
import { MergeFieldButton } from "./MergeFieldButton/MergeFieldButton"
import styles from "./MergeFieldControls.module.scss"
import { mergeFieldIdArray, mergeFieldObject } from "./const"

type MergeFieldControlsProps = {
  onClick: (mergeFieldObject: mergeFieldObject) => void
}

export const MergeFieldControls = ({ onClick }: MergeFieldControlsProps) => {
  return (
    <div className={styles["merge-field-controls"]}>
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
