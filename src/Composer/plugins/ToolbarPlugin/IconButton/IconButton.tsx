import React from "react"
import { Icon } from "../../../ui/Icon/Icon"
import { iconType } from "../../../ui/Icon/types"
import styles from "./IconButton.module.scss"

type IconButtonProps = {
  type: iconType
}

export const IconButton = ({ type }: IconButtonProps) => {
  return <Icon className={styles.iconButton} type={type} />
}
