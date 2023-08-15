import React, { useRef, useState } from "react"
import { Composer } from "./Composer"
import { MergeFieldControls } from "./MergeFieldControls/MergeFieldControls"
import { composerRefProps } from "./MergeFieldHandler/MergeFieldHandler"
import { Output } from "./Output/Output"
import { Maybe } from "./types/globals"

// ts-prune-ignore-next
export const App = () => {
  const composerRef = useRef<composerRefProps>()
  const [output, setOutput] = useState<Maybe<string>>()

  return (
    <>
      <Composer composerRef={composerRef} setOutput={setOutput} />
      <MergeFieldControls
        onClick={(mergeFieldObject) => composerRef.current.dispatchMergeField(mergeFieldObject)}
      />
      <Output output={output} />
    </>
  )
}
