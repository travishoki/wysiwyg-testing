import React from "react"
import { Icon } from "./Icon"
import { getType } from "./IconHeading.helpers"

type IconHeadingProps = {
  num: number
}

export const IconHeading = ({ num }: IconHeadingProps) => {
  const iconType = getType(num)

  return <Icon type={iconType} />
}
