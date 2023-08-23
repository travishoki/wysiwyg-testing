import React from "react"
import { Icon } from "../Icon"
import { getHeadingType } from "./IconHeading.helpers"

type IconHeadingProps = {
  num: number
}

export const IconHeading = ({ num }: IconHeadingProps) => {
  const type = getHeadingType(num)

  return <Icon type={type} />
}
