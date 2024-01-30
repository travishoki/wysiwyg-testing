import React, { Suspense } from "react"
import { formatMergeFieldTitle } from "../../../helpers/mergeFields.helpers"
import { ComposerNodeFallback } from "../../../ui/ComposerNodeFallback/ComposerNodeFallback"
import styles from "./MergeFieldComponent.module.scss"

const MergeFieldComponent = ({ mergeFieldName, style }: MergeFieldComponentProps) => {
  return (
    <Suspense fallback={<ComposerNodeFallback />}>
      <div className={styles["merge-field"]} style={style}>
        <p className={styles.title}>
          <span>{"{ "}</span>
          {formatMergeFieldTitle(mergeFieldName)}
          <span>{" }"}</span>
        </p>
      </div>
    </Suspense>
  )
}

type MergeFieldComponentProps = {
  mergeFieldName: string
  nodeKey: string
  style: Record<string, string>
}

// eslint-disable-next-line import/no-default-export -- This component is lazy loaded.
export default MergeFieldComponent
