import React, { useRef, useState } from "react"
import styles from "./App.module.scss"
import { Composer } from "./Composer/Composer"
import { composerRefProps } from "./Composer/ComposerCustomFunctionHandler/ComposerCustomFunctionHandler"
import { Button } from "./Controls/Button/Button"
import { LockButton } from "./Controls/LockButton/LockButton"
import { MergeFieldControls } from "./MergeFieldControls/MergeFieldControls"
import { mergeFieldNameArray } from "./MergeFieldControls/MergeFieldControls.const"
import { MergeField } from "./types"

let initialState: Maybe<string> = '<p class="composer__paragraph"><br></p>'

// initialState = "asdf" // Text only
// initialState = '<p class="composer__paragraph" dir="ltr">asdf</p>' // Text wrapped in parent
// initialState = '<p class="composer__paragraph" dir="ltr"><span>asdf</span></p>' // Text wrapped in parent with span
// initialState = '<p class="composer__paragraph" dir="ltr" style="width:113px;border:1px solid black;"><span>asdf</span></p>' // Text with multiple styles
// initialState = "{{111}}" // {{hoki-1}}
// initialState = "a {{999}} b" // Invalid Merge Field
// initialState = '<p class="composer__paragraph" dir="ltr"><span class="merge-field">{{111}}</span></p>' // {{hoki-1}}
// initialState = '<p class="composer__paragraph" dir="ltr"><span>a </span><span class="merge-field">{{111}}</span><span> b</span></p>' // a {{hoki-1}} b
// initialState = '<span>a </span><span class="merge-field">{{111}}</span><span> b</span>' // a {{222}} b (no parent container)
// initialState = '<p class="composer__paragraph" dir="ltr"><span class="merge-field">{{111}}</span> and <span class="merge-field">{{222}}</span></p>' // {{hoki-1}} and {{hoki-2}}
// initialState = '<p class="composer__paragraph" dir="ltr"><span>Line 1</span></p><p class="composer__paragraph" dir="ltr"><br></p><p class="composer__paragraph" dir="ltr"><span>Line 2</span></p>' // Line Break
// initialState = '<p class="composer__paragraph"><br></p><table class="composer__table"><colgroup><col><col></colgroup><tbody><tr><th class="composer__tableCell composer__tableCellHeader" style="border: 1px solid black; width: 350px; vertical-align: top; text-align: start; background-color: rgb(242, 243, 245);"><p class="composer__paragraph" dir="ltr"><span>a</span></p></th><th class="composer__tableCell composer__tableCellHeader" style="border: 1px solid black; width: 350px; vertical-align: top; text-align: start; background-color: rgb(242, 243, 245);"><p class="composer__paragraph" dir="ltr"><span>b</span></p></th></tr><tr><th class="composer__tableCell composer__tableCellHeader" style="border: 1px solid black; width: 350px; vertical-align: top; text-align: start; background-color: rgb(242, 243, 245);"><p class="composer__paragraph" dir="ltr"><span>c</span></p></th><td class="composer__tableCell" style="border: 1px solid black; width: 350px; vertical-align: top; text-align: start;"><p class="composer__paragraph" dir="ltr"><span>d</span></p></td></tr></tbody></table><p class="composer__paragraph"><br></p>' // Table

// initialState = `<h1 class="composer__h1" dir="ltr" style="text-align:center;"><b><strong class="composer__textBold">Account Executive Plan</strong></b></h1><p class="composer__paragraph"><br></p><p class="composer__paragraph" dir="ltr"><span>This is our standard Account Executive comp plan here at ABC Company. We are excited to have you onboard and can’t wait for what’s ahead.</span></p><p class="composer__paragraph"><br></p><p class="composer__paragraph" dir="ltr"><b><strong class="composer__textBold">Quota</strong></b></p><table class="composer__table"><colgroup><col><col><col><col></colgroup><tbody><tr><td class="composer__tableCell" style="width:113px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph" dir="ltr"><span>Q1</span></p></td><td class="composer__tableCell" style="width:103px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph" dir="ltr"><span>Q2</span></p></td><td class="composer__tableCell" style="width:131px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph" dir="ltr"><span>Q3</span></p></td><td class="composer__tableCell" style="width:145px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph" dir="ltr"><span>Q4</span></p></td></tr><tr><td class="composer__tableCell" style="width:113px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph"><span>$250,000</span></p></td><td class="composer__tableCell" style="width:103px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph"><span>$300,000</span></p></td><td class="composer__tableCell" style="width:131px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph"><span>$350,000</span></p></td><td class="composer__tableCell" style="width:145px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph"><span>$400,000</span></p></td></tr></tbody></table><p class="composer__paragraph" dir="ltr"><b><strong class="composer__textBold">Variable Pay</strong></b></p><p class="composer__paragraph" dir="ltr"><span>Commission rate: 10% of annual contract value (ACV)</span></p><p class="composer__paragraph" dir="ltr"><span>Accelerator bonuses:</span></p><p class="composer__paragraph" dir="ltr"><span>+5% commission for hitting 110% of quota</span></p><p class="composer__paragraph" dir="ltr"><span>+10% commission for hitting 120% of quota</span></p><p class="composer__paragraph" dir="ltr"><span>+15% commission for hitting 130% of quota</span></p><p class="composer__paragraph"><span> </span></p><p class="composer__paragraph" dir="ltr"><span>Base Pay</span></p><p class="composer__paragraph" dir="ltr"><span class="merge-field">{{TWVyZ2VGaWVsZC02NzI1}}</span><span> per year</span></p><p class="composer__paragraph"><span> </span></p><p class="composer__paragraph" dir="ltr"><span>Total Compensation</span></p><p class="composer__paragraph" dir="ltr"><span class="merge-field">{{TWVyZ2VGaWVsZC02NzI1}}</span><span> per year</span></p><p class="composer__paragraph"><span> </span></p><p class="composer__paragraph" dir="ltr"><b><strong class="composer__textBold">President’s Club</strong></b></p><p class="composer__paragraph" dir="ltr"><span>Account executives who achieve their full year quota will be invited to an all-expenses-paid vacation to Bora Bora for two weeks.</span></p><p class="composer__paragraph"><br></p><p class="composer__paragraph" dir="ltr"><span>For more information, please visit this link:</span></p><p class="composer__paragraph" dir="ltr"><a href="https://google.com" class="composer__link"><span>app.abc.com</span></a></p><p class="composer__paragraph"><br></p><p class="composer__paragraph"><br></p>`
// initialState = `<table class="composer__table"><colgroup><col><col><col><col></colgroup><tbody><tr><td class="composer__tableCell" style="width:113px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph" dir="ltr"><span>Q1</span></p></td><td class="composer__tableCell" style="width:103px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph" dir="ltr"><span>Q2</span></p></td><td class="composer__tableCell" style="width:131px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph" dir="ltr"><span>Q3</span></p></td><td class="composer__tableCell" style="width:145px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph" dir="ltr"><span>Q4</span></p></td></tr><tr><td class="composer__tableCell" style="width:113px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph"><span>$250,000</span></p></td><td class="composer__tableCell" style="width:103px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph"><span>$300,000</span></p></td><td class="composer__tableCell" style="width:131px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph"><span>$350,000</span></p></td><td class="composer__tableCell" style="width:145px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph"><span>$400,000</span></p></td></tr></tbody></table><p class="composer__paragraph" dir="ltr"><b><strong class="composer__textBold">Variable Pay</strong></b></p><p class="composer__paragraph" dir="ltr"><span>Commission rate: 10% of annual contract value (ACV)</span></p><p class="composer__paragraph" dir="ltr"><span>Accelerator bonuses:</span></p><p class="composer__paragraph" dir="ltr"><span>+5% commission for hitting 110% of quota</span></p><p class="composer__paragraph" dir="ltr"><span>+10% commission for hitting 120% of quota</span></p><p class="composer__paragraph" dir="ltr"><span>+15% commission for hitting 130% of quota</span></p><p class="composer__paragraph"><span> </span></p><p class="composer__paragraph" dir="ltr"><span>Base Pay</span></p><p class="composer__paragraph" dir="ltr"><span class="merge-field">{{TWVyZ2VGaWVsZC02NzI1}}</span><span> per year</span></p><p class="composer__paragraph"><span> </span></p><p class="composer__paragraph" dir="ltr"><span>Total Compensation</span></p><p class="composer__paragraph" dir="ltr"><span class="merge-field">{{TWVyZ2VGaWVsZC02NzI1}}</span><span> per year</span></p><p class="composer__paragraph"><span> </span></p><p class="composer__paragraph" dir="ltr"><b><strong class="composer__textBold">President’s Club</strong></b></p><p class="composer__paragraph" dir="ltr"><span>Account executives who achieve their full year quota will be invited to an all-expenses-paid vacation to Bora Bora for two weeks.</span></p><p class="composer__paragraph"><br></p><p class="composer__paragraph" dir="ltr"><span>For more information, please visit this link:</span></p>`
// initialState = `<table class="composer__table"><colgroup><col><col><col><col></colgroup><tbody><tr><td class="composer__tableCell" style="width:113px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph" dir="ltr"><span>Q1</span></p></td><td class="composer__tableCell" style="width:103px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph" dir="ltr"><span>Q2</span></p></td><td class="composer__tableCell" style="width:131px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph" dir="ltr"><span>Q3</span></p></td><td class="composer__tableCell" style="width:145px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph" dir="ltr"><span>Q4</span></p></td></tr><tr><td class="composer__tableCell" style="width:113px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph"><span>$250,000</span></p></td><td class="composer__tableCell" style="width:103px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph"><span>$300,000</span></p></td><td class="composer__tableCell" style="width:131px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph"><span>$350,000</span></p></td><td class="composer__tableCell" style="width:145px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph"><span>$400,000</span></p></td></tr></tbody></table>`
// initialState = `<table class="composer__table"><tbody><tr><td class="composer__tableCell" style="width:113px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph" dir="ltr"><span>Q1</span></p></td><td class="composer__tableCell" style="width:103px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph" dir="ltr"><span>Q2</span></p></td><td class="composer__tableCell" style="width:131px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph" dir="ltr"><span>Q3</span></p></td><td class="composer__tableCell" style="width:145px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph" dir="ltr"><span>Q4</span></p></td></tr><tr><td class="composer__tableCell" style="width:113px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph"><span>$250,000</span></p></td><td class="composer__tableCell" style="width:103px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph"><span>$300,000</span></p></td><td class="composer__tableCell" style="width:131px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph"><span>$350,000</span></p></td><td class="composer__tableCell" style="width:145px;border:1px solid black;vertical-align:top;text-align:start;"><p class="composer__paragraph"><span>$400,000</span></p></td></tr></tbody></table>`

// ts-prune-ignore-next
export const App = () => {
  const composerRef = useRef<composerRefProps>()
  const [storedContent, setStoredContent] = useState(initialState)
  const [tempContent, setTempContent] = useState(initialState)

  const onClickMergeField = (mergeField: MergeField) => {
    if (composerRef.current) {
      composerRef.current.dispatchMergeField(mergeField)
    }
  }

  const onGetValue = () => {
    if (composerRef.current) {
      const output = composerRef.current.getValue()
      /* eslint-disable-next-line no-console */
      console.log(output)

      initialState = output
    }
  }

  const onSubmit = () => {
    const isEmpty = composerRef.current.getIsEmpty()
    if (isEmpty) {
      /* eslint-disable-next-line no-console */
      console.log("Empty")

      return
    }

    if (composerRef.current) {
      const output = composerRef.current.getValue()
      setStoredContent(output)
      /* eslint-disable-next-line no-console */
      console.log(output)
    }
  }

  const onLock = () => {
    if (composerRef.current) {
      composerRef.current.onLock()
    }
  }

  /* eslint-disable-next-line */
  console.log(`tempContent: ${tempContent}`)

  const isDirty = !!tempContent && tempContent !== storedContent

  return (
    <div className={styles.app}>
      {isDirty ? "Dirty" : "Clean"}
      <Composer
        className={styles.composer}
        composerRef={composerRef}
        initialState={initialState}
        mergeFields={mergeFieldNameArray}
        setContent={setTempContent}
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
