import React from "react"
import classNames from "classnames"
import styles from "./MergeFieldIcon.module.scss"

type MergeFieldIconProps = {
  name: string
}

export const MergeFieldIcon = ({ name }: MergeFieldIconProps) => {
  let icon

  switch (name) {
    case "DATE_APPROVED":
      icon = styles.calendarDatesIcon
      break
    case "EMAIL":
      icon = styles.atSignIcon
      break
    case "FULL_NAME":
      icon = styles.userIcon
      break
    default:
      icon = styles.bracketsIcon
      break
  }

  return <i className={classNames(styles.icon, icon)} />
}
