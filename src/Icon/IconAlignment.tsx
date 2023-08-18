import React from "react"
import { Icon } from "./Icon"
import { getType } from "./IconAlignment.helpers"
import { alignmentTypes } from "./types"

type IconAlignmentProps = {
  type: alignmentTypes
}

export const IconAlignment = ({ type }: IconAlignmentProps) => {
  const iconType = getType(type)

  return <Icon type={iconType} />
}
