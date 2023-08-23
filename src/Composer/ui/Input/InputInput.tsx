import React from "react"
import styles from "./InputInput.module.scss"

type InputInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const InputInput = (props: InputInputProps) => {
  return <input className={styles.inputInput} {...props} />
}
