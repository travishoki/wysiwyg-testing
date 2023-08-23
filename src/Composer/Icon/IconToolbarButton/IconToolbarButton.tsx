import React from "react"
import { IconBare } from "../IconBare/IconBare"
import { iconType } from "../types"
import styles from "./IconToolbarButton.module.scss"

type IconToolbarButtonProps = {
  type: iconType
}

export const IconToolbarButton = ({ type }: IconToolbarButtonProps) => {
  return <IconBare className={styles.iconToolbarButton} type={type} />
}
