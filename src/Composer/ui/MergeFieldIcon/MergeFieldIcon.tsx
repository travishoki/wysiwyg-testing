import React from "react"
// import UserIcon from "shared/icons/basic/user.svg" // Add when porting over
// import AtSignIcon from "shared/icons/symbols/at-sign.svg" // Add when porting over
// import BracketsIcon from "shared/icons/various/brackets.svg" // Add when porting over
import { ReactComponent as UserIcon } from "../../images/internal/shared/icons/basic/user.svg" // Remove when porting over
import { ReactComponent as AtSignIcon } from "../../images/internal/shared/icons/symbols/at-sign.svg" // Remove when porting over
import { ReactComponent as BracketsIcon } from "../../images/internal/shared/icons/various/brackets.svg" // Remove when porting over
import styles from "./MergeFieldIcon.module.scss"

type MergeFieldIconProps = {
  name: string
}

export const MergeFieldIcon = ({ name }: MergeFieldIconProps) => {
  let Icon

  switch (name) {
    case "EMAIL":
      Icon = AtSignIcon
      break
    case "FULL_NAME":
      Icon = UserIcon
      break
    default:
      Icon = BracketsIcon
      break
  }

  return <Icon className={styles.icon} />
}
