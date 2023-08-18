import React from "react"
import classNames from "classnames"
import stylesIcon from "./Icon.module.scss"
import styles from "./IconFormat.module.scss"
import { iconType } from "./types"

type IconFormatProps = {
  type: iconType
}

export const IconFormat = ({ type }: IconFormatProps) => {
  return <i className={classNames(styles.format, stylesIcon[type])} />
}
