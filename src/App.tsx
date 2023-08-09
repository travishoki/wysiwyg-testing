import React, { useState } from "react"

import { Output } from "./Output/Output"
import { Composer } from "./Composer"

// ts-prune-ignore-next
export const App = () => {
  const [output, setOutput] = useState<string>()

  return (
    <>
      <Composer setOutput={setOutput} />
      <Output output={output} />
    </>
  )
}
