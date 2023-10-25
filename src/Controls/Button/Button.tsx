import React from "react"
import classNames from "classnames"
import styles from "./Button.module.scss"

type ButtonProps = {
  className?: string
  disabled?: boolean
  onClick: () => void
  title: string
}

export const Button = ({ className, disabled, onClick, title }: ButtonProps) => (
  <button className={classNames(styles.button, className)} disabled={disabled} onClick={onClick}>
    {title}
  </button>
)
