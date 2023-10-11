import React, { useRef } from "react"
import styles from "./App.module.scss"
import { Composer } from "./Composer/Composer"
import { composerRefProps } from "./Composer/ComposerCustomFunctionHandler/ComposerCustomFunctionHandler"
import { Controls } from "./Controls/Controls"
import { MergeFieldControls } from "./MergeFieldControls/MergeFieldControls"
import { mergeFieldNameArray } from "./MergeFieldControls/MergeFieldControls.const"
import { MergeField } from "./types"

let initialState: Maybe<string> = null

initialState =
  '<p class="composer__paragraph" dir="ltr">' +
  "<span>a </span>" +
  '<span data-merge-field-component="true" class="merge-field">{{hoki-1}}</span>' +
  "<span> b</span>" +
  "</p>"

// ts-prune-ignore-next
export const App = () => {
  const composerRef = useRef<composerRefProps>()

  const onClickMergeField = (mergeField: MergeField) => {
    if (composerRef.current) {
      composerRef.current.dispatchMergeField(mergeField)
    }
  }

  const onSubmit = () => {
    const isEmpty = composerRef.current.getIsEmpty()

    if (isEmpty) {
      /* eslint-disable-next-line no-alert */
      alert("Empty")

      return
    }

    if (composerRef.current) {
      const output = composerRef.current.onSubmit()
      /* eslint-disable-next-line no-alert */
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
        className={styles.composer}
        composerRef={composerRef}
        initialState={initialState}
        mergeFields={mergeFieldNameArray}
      />
      <MergeFieldControls onClick={onClickMergeField} />
      <Controls onLock={onLock} onSubmit={onSubmit} />
    </div>
  )
}
