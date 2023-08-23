import { alignmentTypes, iconType } from "../types"

export const getAlignmentType = (type: alignmentTypes): iconType => {
  switch (type) {
    case "center":
      return "center-align"
    case "justify":
      return "justify-align"
    case "left":
      return "left-align"
    case "right":
      return "right-align"
  }
}
