import React from "react"
import styles from "./Button.module.scss"

type ButtonProps = {
  onClick: () => void
  title: string
}

export const Button = ({ onClick, title }: ButtonProps) => (
  <button className={styles.button} onClick={onClick}>
    {title}
  </button>
)
