import React, { CSSProperties, ReactNode } from "react"
import styles from "./InputLabel.module.scss"

type InputLabelProps = {
  children: ReactNode
  style?: CSSProperties
}

export const InputLabel = ({ children, style }: InputLabelProps) => {
  return (
    <div className={styles.inputLabel} style={style}>
      {children}
    </div>
  )
}
