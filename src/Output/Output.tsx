import React from "react"
import { Maybe } from "../Composer/types/globals"
import styles from "./Output.module.scss"

type OutputProps = {
  output: Maybe<string>
}

export const Output = ({ output }: OutputProps) => {
  if (!output) return null

  return (
    <div className={styles.outputShell}>
      <div className={styles.outputContent}>{output}</div>
      <div className={styles.outputContent}>
        <div dangerouslySetInnerHTML={{ __html: output }} />
      </div>
    </div>
  )
}
