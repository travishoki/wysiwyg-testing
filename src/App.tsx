import React, { useRef, useState } from "react"
import styles from "./App.module.scss"
import { Composer } from "./Composer/Composer"
import { composerRefProps } from "./Composer/MergeFieldHandler/MergeFieldHandler"
import { Maybe } from "./Composer/types/globals"
import { MergeFieldControls } from "./MergeFieldControls/MergeFieldControls"
import { Output } from "./Output/Output"

// ts-prune-ignore-next
export const App = () => {
  const composerRef = useRef<composerRefProps>(null)
  const [output, setOutput] = useState<Maybe<string>>()

  const onChange = () => {
    setOutput(null)
  }

  const composerRefCurrent = composerRef.current

  return (
    <div className={styles.app}>
      <Composer composerRef={composerRef} onChange={onChange} onSubmit={setOutput} />
      {composerRefCurrent !== null && (
        <MergeFieldControls
          onClick={(mergeFieldObject) => composerRefCurrent.dispatchMergeField(mergeFieldObject)}
        />
      )}
      <Output output={output} />
    </div>
  )
}
