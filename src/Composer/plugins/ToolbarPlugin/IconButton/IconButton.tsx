import React from "react"
import classNames from "classnames"
import { Icon } from "../../../ui/Icon/Icon"
import { iconType } from "../../../ui/Icon/types"
import styles from "./IconButton.module.scss"

type IconButtonProps = {
  disabled?: boolean
  type: iconType
}

export const IconButton = ({ disabled, type }: IconButtonProps) => {
  return (
    <Icon className={classNames(styles.iconButton, disabled ? styles.disabled : "")} type={type} />
  )
}
