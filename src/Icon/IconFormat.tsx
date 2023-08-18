import React from "react"
import { IconBare } from "./IconBare"
import styles from "./IconFormat.module.scss"
import { iconType } from "./types"

type IconFormatProps = {
  type: iconType
}

export const IconFormat = ({ type }: IconFormatProps) => {
  return <IconBare className={styles.format} type={type} />
}
