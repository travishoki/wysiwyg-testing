import React from "react"
import classNames from "classnames"
import styles from "../IconStyled/IconStyled.module.scss"
import { iconType } from "../types"

type IconBareProps = {
  className?: string
  type: iconType
}

export const IconBare = ({ className, type }: IconBareProps) => {
  return <i className={classNames(className, styles[type])} />
}
