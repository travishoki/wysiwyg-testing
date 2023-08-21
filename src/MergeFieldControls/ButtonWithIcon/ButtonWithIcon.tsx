import React from "react"
import styles from "./ButtonWithIcon.module.scss"

type ButtonWithIconProps = {
  iconUrl: string
  onClick: () => void
  title: string
}

export const ButtonWithIcon = ({ iconUrl, onClick, title }: ButtonWithIconProps) => (
  <button className={styles.controlButton} onClick={onClick}>
    <div className={styles.controlButtonInner}>
      {iconUrl && <img alt={title} className={styles.icon} height="15" src={iconUrl} width="15" />}
      {title}
    </div>
  </button>
)
