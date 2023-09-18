import React from "react"
import classNames from "classnames"
import styles from "./ButtonIcon.module.scss"

type ButtonIconProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const ButtonIcon = (props: ButtonIconProps) => (
  <button {...props} className={classNames(styles.button, props.className)} />
)
