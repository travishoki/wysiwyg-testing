import React from "react"
import { Icon } from "../Icon"
import { getType } from "./helpers"

type IconHeadingProps = {
  num: number
}

export const IconHeading = ({ num }: IconHeadingProps) => {
  const type = getType(num)

  return <Icon type={type} />
}
