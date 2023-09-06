import React from "react"
import styles from "./ButtonWithIcon.module.scss"

type ButtonWithIconProps = {
  onClick: () => void
  title: string
}

export const ButtonWithIcon = ({ onClick, title }: ButtonWithIconProps) => (
  <button className={styles.controlButton} onClick={onClick}>
    <div className={styles.controlButtonInner}>{title}</div>
  </button>
)
