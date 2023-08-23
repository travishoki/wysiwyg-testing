import { iconType } from "../types"

export const getType = (num: number): iconType => {
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
