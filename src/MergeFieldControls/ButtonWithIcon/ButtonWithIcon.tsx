import React from "react"
import classNames from "classnames"
import styles from "./ButtonWithIcon.module.scss"

type ButtonWithIconProps = {
  onClick: () => void
  title: string
}

export const ButtonWithIcon = ({ onClick, title }: ButtonWithIconProps) => (
  <button className={classNames(styles.controlButton, styles.buttonWithIcon)} onClick={onClick}>
    <div className={styles.controlButtonInner}>{title}</div>
  </button>
)
