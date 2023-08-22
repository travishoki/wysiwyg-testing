import React from "react"
import { Icon } from "../Icon"
import { alignmentTypes } from "../types"
import { getType } from "./helpers"

type IconAlignmentProps = {
  type: alignmentTypes
}

export const IconAlignment = ({ type }: IconAlignmentProps) => {
  const iconType = getType(type)

  return <Icon type={iconType} />
}
