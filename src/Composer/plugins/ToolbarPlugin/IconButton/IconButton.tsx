import React from "react"
import { Icon } from "../../../Icon/Icon"
import { iconType } from "../../../Icon/types"
import styles from "./IconButton.module.scss"

type IconButtonProps = {
  type: iconType
}

export const IconButton = ({ type }: IconButtonProps) => {
  return <Icon className={styles.iconButton} type={type} />
}
