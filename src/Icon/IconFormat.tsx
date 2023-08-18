import React from "react"
import styles from "./IconFormat.module.scss"
import { iconType } from "./types"
import { IconBare } from "./IconBare"

type IconFormatProps = {
  type: iconType
}

export const IconFormat = ({ type }: IconFormatProps) => {
  return <IconBare type={type} className={styles.format} />
}
