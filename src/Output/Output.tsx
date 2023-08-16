import * as React from "react"
import { Maybe } from "../types/globals"
import styles from "./Output.module.scss"

type OutputProps = {
  output: Maybe<string>
}

export const Output = ({ output }: OutputProps) => {
  if (!output) return null

  return (
    <div className={styles["output-shell"]}>
      <div className={styles["output-content"]}>{output}</div>
      <div className={styles["output-content"]}>
        <div dangerouslySetInnerHTML={{ __html: output }} />
      </div>
    </div>
  )
}
