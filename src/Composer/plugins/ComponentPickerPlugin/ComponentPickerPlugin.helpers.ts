import { alignmentTypes, iconType } from "../../ui/Icon/types"

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

export const getHeadingType = (num: number): iconType => {
  switch (num) {
    case 1:
      return "h1"
    case 2:
      return "h2"
    case 3:
      return "h3"
    case 4:
      return "h4"
    case 5:
      return "h4"
    case 6:
      return "h4"
  }
}
