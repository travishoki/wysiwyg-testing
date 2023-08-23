import React from "react"
import { IconBare } from "../../../Icon/IconBare/IconBare"
import { iconType } from "../../../Icon/types"
import styles from "./IconButton.module.scss"

type IconButtonProps = {
  type: iconType
}

export const IconButton = ({ type }: IconButtonProps) => {
  return <IconBare className={styles.iconButton} type={type} />
}
