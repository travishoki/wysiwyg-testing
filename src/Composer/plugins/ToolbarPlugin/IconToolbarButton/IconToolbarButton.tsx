import React from "react"
import { IconBare } from "../../../Icon/IconBare/IconBare"
import { iconType } from "../../../Icon/types"
import styles from "./IconToolbarButton.module.scss"

type IconToolbarButtonProps = {
  type: iconType
}

export const IconToolbarButton = ({ type }: IconToolbarButtonProps) => {
  return <IconBare className={styles.iconToolbarButton} type={type} />
}
