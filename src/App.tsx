import React, { useRef, useState } from "react"
import styles from "./App.module.scss"
import { Composer } from "./Composer/Composer"
import { composerRefProps } from "./Composer/ComposerCustomFunctionHandler/ComposerCustomFunctionHandler"
import { Controls } from "./Controls/Controls"
import { MergeFieldControls } from "./MergeFieldControls/MergeFieldControls"
import { mergeFieldNameArray } from "./MergeFieldControls/MergeFieldControls.const"
import { Output } from "./Output/Output"
import { MergeField } from "./types"

// ts-prune-ignore-next
export const App = () => {
  const composerRef = useRef<composerRefProps>()
  const [output, setOutput] = useState<Maybe<string>>()

  const onChange = () => {
    setOutput(null)
  }

  const onClickMergeField = (mergeField: MergeField) => {
    if (composerRef.current) {
      composerRef.current.dispatchMergeField(mergeField)
    }
  }

  const onSubmit = () => {
    if (composerRef.current) {
      const output = composerRef.current.onSubmit()
      alert(output)
    }
  }

  const onLock = () => {
    if (composerRef.current) {
      composerRef.current.onLock()
    }
  }

  return (
    <div className={styles.app}>
      <Composer
        composerRef={composerRef}
        mergeFields={mergeFieldNameArray}
        onChange={onChange}
        onSubmit={setOutput}
      />
      <MergeFieldControls onClick={onClickMergeField} />
      <Controls onLock={onLock} onSubmit={onSubmit} />
      <Output output={output} />
    </div>
  )
}
