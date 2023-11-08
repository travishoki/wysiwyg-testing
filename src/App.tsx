import React, { useRef, useState } from "react"
import styles from "./App.module.scss"
import { Composer } from "./Composer/Composer"
import { composerRefProps } from "./Composer/ComposerCustomFunctionHandler/ComposerCustomFunctionHandler"
import { Button } from "./Controls/Button/Button"
import { LockButton } from "./Controls/LockButton/LockButton"
import { MergeFieldControls } from "./MergeFieldControls/MergeFieldControls"
import { mergeFieldNameArray } from "./MergeFieldControls/MergeFieldControls.const"
import { MergeField } from "./types"

let initialState: Maybe<string> = null

// initialState = "asdf" // Text only
// initialState = '<p class="composer__paragraph" dir="ltr">asdf</p>' // Text wrapped in parent
// initialState = "{{111}}" // {{hoki-1}}
// initialState = "a {{999}} b" // Invalid Merge Field
// initialState = '<p class="composer__paragraph" dir="ltr"><span class="merge-field">{{111}}</span></p>' // {{hoki-1}}
// initialState =  '<p class="composer__paragraph" dir="ltr"><span>a </span><span class="merge-field">{{111}}</span><span> b</span></p>' // a {{hoki-1}} b
// initialState = '<span>a </span><span class="merge-field">{{111}}</span><span> b</span>' // a {{222}} b (no parent container)
// initialState = '<p class="composer__paragraph" dir="ltr"><span class="merge-field">{{111}}</span> and <span class="merge-field">{{222}}</span></p>' // {{hoki-1}} and {{hoki-2}}
// initialState =  '<p class="composer__paragraph" dir="ltr"><span>Line 1</span></p><p class="composer__paragraph" dir="ltr"><br></p><p class="composer__paragraph" dir="ltr"><span>Line 2</span></p>' // Line Break
// initialState = '<p class="composer__paragraph"><br></p><table class="composer__table"><colgroup><col><col></colgroup><tbody><tr><th class="composer__tableCell composer__tableCellHeader" style="border: 1px solid black; width: 350px; vertical-align: top; text-align: start; background-color: rgb(242, 243, 245);"><p class="composer__paragraph" dir="ltr"><span>a</span></p></th><th class="composer__tableCell composer__tableCellHeader" style="border: 1px solid black; width: 350px; vertical-align: top; text-align: start; background-color: rgb(242, 243, 245);"><p class="composer__paragraph" dir="ltr"><span>b</span></p></th></tr><tr><th class="composer__tableCell composer__tableCellHeader" style="border: 1px solid black; width: 350px; vertical-align: top; text-align: start; background-color: rgb(242, 243, 245);"><p class="composer__paragraph" dir="ltr"><span>c</span></p></th><td class="composer__tableCell" style="border: 1px solid black; width: 350px; vertical-align: top; text-align: start;"><p class="composer__paragraph" dir="ltr"><span>d</span></p></td></tr></tbody></table><p class="composer__paragraph"><br></p>' // Table

// ts-prune-ignore-next
export const App = () => {
  const composerRef = useRef<composerRefProps>()
  const [isDirty, setIsDirty] = useState(false)

  const onClickMergeField = (mergeField: MergeField) => {
    if (composerRef.current) {
      composerRef.current.dispatchMergeField(mergeField)
    }
  }

  const onGetValue = () => {
    if (composerRef.current) {
      const output = composerRef.current.getValue()
      /* eslint-disable-next-line no-alert */
      alert(output)

      initialState = output
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
      <Composer
        className={styles.composer}
        composerRef={composerRef}
        initialState={initialState}
        mergeFields={mergeFieldNameArray}
        setIsDirty={setIsDirty}
      />
      <MergeFieldControls onClick={onClickMergeField} />
      <>
        <Button disabled={!isDirty} onClick={onSubmit} title="Submit" />
        <Button onClick={onGetValue} title="Get Value" />
        <LockButton onClick={onLock} />
      </>
    </div>
  )
}
