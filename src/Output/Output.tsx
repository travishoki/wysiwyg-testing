import * as React from "react"
import "./Output.css"
import { Maybe } from "../types/globals"

export const Output = ({ output }: OutputProps) => {
  if (!output) return null

  return (
    <div className="output-shell">
      <div className="output-content">{output}</div>
      <div className="output-content">
        <div dangerouslySetInnerHTML={{ __html: output }} />
      </div>
    </div>
  )
}

type OutputProps = {
  output: Maybe<string>
}
