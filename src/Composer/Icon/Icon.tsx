import React from "react"
import classNames from "classnames"
import styles from "./Icon.module.scss"
import { iconType } from "./types"

type IconProps = {
  className?: string
  type: iconType
}

export const Icon = ({ className, type }: IconProps) => {
  return <i className={classNames(className, styles[type])} />
}
