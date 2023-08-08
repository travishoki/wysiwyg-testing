import React, { useState } from "react"

import { Output } from "./Output/Output"
import { Composer } from "./Composer"

// ts-prune-ignore-next
export const App = () => {
  const [output, setOutput] = useState<string>()

  const onChange = () => {
    setOutput(null)
  }

  return (
    <>
      <Composer onChange={onChange} setOutput={setOutput} />

      <Output output={output} />
    </>
  )
}
