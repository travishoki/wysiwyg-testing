import React from "react"
import { IconBare } from "../IconBare/IconBare"
import { iconType } from "../types"
import styles from "./IconFormat.module.scss"

type IconFormatProps = {
  type: iconType
}

export const IconFormat = ({ type }: IconFormatProps) => {
  return <IconBare className={styles.format} type={type} />
}
