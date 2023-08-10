import React, { useRef, useState } from "react"

import { Output } from "./Output/Output"
import { Composer } from "./Composer"
import { MergeFieldControls } from "./MergeFieldControls/MergeFieldControls"
import { composerRefProps } from "./MergeFieldHandler/MergeFieldHandler"

// ts-prune-ignore-next
export const App = () => {
  const composerRef = useRef<composerRefProps>()
  const [output, setOutput] = useState<string>()

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
