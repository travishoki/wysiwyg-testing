import React from "react"
import styles from "./Icon.module.scss"
import { iconType } from "./types"
import classNames from "classnames"

type IconBareProps = {
  className?: string
  type: iconType
}

export const IconBare = ({ className, type }: IconBareProps) => {
  return <i className={classNames(className, styles[type])} />
}
