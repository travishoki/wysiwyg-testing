import React from "react"
import classNames from "classnames"
import { iconType } from "../types"
import styles from "./IconStyled.module.scss"

type IconStyledProps = {
  type: iconType
}

export const IconStyled = ({ type }: IconStyledProps) => {
  return <i className={classNames(styles.icon, styles[type])} />
}
