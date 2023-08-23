import React, { useRef, useState } from "react"
import styles from "./App.module.scss"
import { Composer } from "./Composer/Composer"
import { composerRefProps } from "./Composer/MergeFieldHandler/MergeFieldHandler"
import { Maybe } from "./Composer/types/globals"
import { MergeFieldControls } from "./MergeFieldControls/MergeFieldControls"
import { Output } from "./Output/Output"

// ts-prune-ignore-next
export const App = () => {
  const composerRef = useRef<composerRefProps>()
  const [output, setOutput] = useState<Maybe<string>>()

  return (
    <div className={styles.app}>
      <Composer composerRef={composerRef} setOutput={setOutput} />
      {composerRef && (
        <MergeFieldControls
          onClick={(mergeFieldObject) => composerRef.current.dispatchMergeField(mergeFieldObject)}
        />
      )}
      <Output output={output} />
    </div>
  )
}
