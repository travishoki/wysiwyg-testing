import * as React from "react"
import { Maybe } from "../types/globals"
import "./Output.css"

type OutputProps = {
  output: Maybe<string>
}

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
