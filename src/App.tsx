import React, { useRef, useState } from "react"
import styles from "./App.module.scss"
import { Composer } from "./Composer/Composer"
import { composerRefProps } from "./Composer/ComposerCustomFunctionHandler/ComposerCustomFunctionHandler"
import { Controls } from "./Controls/Controls"
import { MergeFieldControls } from "./MergeFieldControls/MergeFieldControls"
import { mergeFieldNameArray } from "./MergeFieldControls/MergeFieldControls.const"
import { MergeField } from "./types"

let initialState: Maybe<string> = null

// ----- Text Only -----
// initialState = "asdf"
// initialState = '<p class="composer__paragraph" dir="ltr">asdf</p>'

// ----- Merge Fields -----
initialState =
  '<p class="composer__paragraph" dir="ltr">' +
  "<span>a </span>" +
  '<span data-merge-field-component="true" class="merge-field">{{hoki-1}}</span>' +
  "<span> b</span>" +
  "</p>"

// initialState =
//   "<span>a </span>" +
//   '<span data-merge-field-component="true" class="merge-field">{{hoki-1}}</span>' +
//   "<span> b</span>"

// ts-prune-ignore-next
export const App = () => {
  const composerRef = useRef<composerRefProps>()
  const [isDirty, setIsDirty] = useState(false)

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

    if (isDirty) {
      /* eslint-disable-next-line no-alert */
      alert("Dirty")

      return
    }

    if (composerRef.current) {
      const output = composerRef.current.getValue()
      /* eslint-disable-next-line no-alert */
      alert(output)

      initialState = output
    }
  }

  const onLock = () => {
    if (composerRef.current) {
      composerRef.current.onLock()
    }
  }

  return (
    <div className={styles.app}>
      {isDirty ? "Unsaved" : "Saved"}
      <Composer
        className={styles.composer}
        composerRef={composerRef}
        initialState={initialState}
        mergeFields={mergeFieldNameArray}
        setIsDirty={setIsDirty}
      />
      <MergeFieldControls onClick={onClickMergeField} />
      <Controls onLock={onLock} onSubmit={onSubmit} />
    </div>
  )
}
