import React, { useRef, useState } from "react"
import styles from "./App.module.scss"
import { Composer } from "./Composer/Composer"
import { composerRefProps } from "./Composer/MergeFieldHandler/MergeFieldHandler"
import { MergeFieldControls } from "./MergeFieldControls/MergeFieldControls"
import { Output } from "./Output/Output"

// ts-prune-ignore-next
export const App = () => {
  const composerRef = useRef<composerRefProps>()
  const [output, setOutput] = useState<Maybe<string>>()

  const onChange = () => {
    setOutput(null)
  }

  return (
    <div className={styles.app}>
      <Composer composerRef={composerRef} onChange={onChange} onSubmit={setOutput} />
      <MergeFieldControls
        onClick={(mergeField) => {
          if (composerRef.current) {
            composerRef.current.dispatchMergeField(mergeField)
          }
        }}
      />
      <Output output={output} />
    </div>
  )
}
