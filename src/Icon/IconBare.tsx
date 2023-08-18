import React from "react"
import styles from "./Icon.module.scss"
import { iconType } from "./types"

type IconBareProps = {
  type: iconType
}

export const IconBare = ({ type }: IconBareProps) => {
  return <i className={styles[type]} />
}
