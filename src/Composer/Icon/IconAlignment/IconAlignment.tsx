import React from "react"
import { Icon } from "../Icon"
import { alignmentTypes } from "../types"
import { getAlignmentType } from "./IconAlignment.helpers"

type IconAlignmentProps = {
  type: alignmentTypes
}

export const IconAlignment = ({ type }: IconAlignmentProps) => {
  const iconType = getAlignmentType(type)

  return <Icon type={iconType} />
}
