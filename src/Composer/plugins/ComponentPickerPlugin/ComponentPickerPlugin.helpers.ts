import { TFunction } from "react-i18next"
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
    default:
      return "left-align"
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
      return "h5"
    case 6:
      return "h6"
    default:
      return "h1"
  }
}

export const getHeadingTitle = (num: number, t: TFunction<"scenes", "composer">): string => {
  switch (num) {
    case 1:
      return t("Heading 1")
    case 2:
      return t("Heading 2")
    case 3:
      return t("Heading 3")
    case 4:
      return t("Heading 4")
    case 5:
      return t("Heading 5")
    case 6:
      return t("Heading 6")
    default:
      return t("Heading 1")
  }
}
