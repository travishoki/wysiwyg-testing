import React from "react"
import classNames from "classnames"
import styles from "./Button.module.scss"

type ButtonProps = {
  className?: string
  onClick: () => void
  title: string
}

export const Button = ({ className, onClick, title }: ButtonProps) => (
  <button className={classNames(styles.button, className)} onClick={onClick}>
    {title}
  </button>
)
