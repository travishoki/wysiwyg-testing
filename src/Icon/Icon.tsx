import React from "react"
import classNames from "classnames"
import styles from "./Icon.module.scss"
import { iconType } from "./types"

type IconProps = {
  type: iconType
}

export const Icon = ({ type }: IconProps) => {
  return <i className={classNames(styles.icon, styles[type])} />
}
