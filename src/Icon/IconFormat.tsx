import React from "react"
import classNames from "classnames"
import styles from "./Icon.module.scss"
import { iconType } from "./types"

type IconFormatProps = {
  type: iconType
}

export const IconFormat = ({ type }: IconFormatProps) => {
  return <i className={classNames("format", styles[type])} />
}
