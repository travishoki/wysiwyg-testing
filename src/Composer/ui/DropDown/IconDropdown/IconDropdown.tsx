import React from "react"
import classNames from "classnames"
import stylesIcon from "../../Icon/Icon.module.scss"
import { iconType } from "../../Icon/types"
import styles from "./IconDropdown.module.scss"

type IconDropdownProps = {
  type: iconType
}

export const IconDropdown = ({ type }: IconDropdownProps) => {
  return <i className={classNames(styles.icon, stylesIcon[type])} />
}
