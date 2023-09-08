import React, { Suspense } from "react"
import { formatMergeFieldTitle } from "../../../helpers/mergeFields.helpers"
import { ComposerNodeFallback } from "../../../ui/ComposerNodeFallback/ComposerNodeFallback"
import styles from "./MergeFieldComponent.module.scss"

const MergeFieldComponent = ({ mergeFieldName }: MergeFieldComponentProps) => {
  return (
    <Suspense fallback={<ComposerNodeFallback />}>
      <div className={styles["merge-field"]}>
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
}

// eslint-disable-next-line import/no-default-export -- This component is lazy loaded.
export default MergeFieldComponent
