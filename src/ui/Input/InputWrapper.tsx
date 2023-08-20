import React, { ReactNode } from "react"
import styles from "./InputWrapper.module.scss"

type InputWrapperProps = {
  children: ReactNode
}

export const InputWrapper = ({ children }: InputWrapperProps) => {
  return <div className={styles.inputWrapper}>{children}</div>
}
