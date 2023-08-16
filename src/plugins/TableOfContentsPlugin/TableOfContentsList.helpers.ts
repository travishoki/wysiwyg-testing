import { HeadingTagType } from "@lexical/rich-text"

const MARGIN_ABOVE_EDITOR = 624
const HEADING_WIDTH = 9

export const indent = (tagName: HeadingTagType) => {
  if (tagName === "h2") {
    return "heading2"
  } else if (tagName === "h3") {
    return "heading3"
  }
}

export const isHeadingAtTheTopOfThePage = (element: HTMLElement): boolean => {
  const elementYPosition = element?.getClientRects()[0].y
  return (
    elementYPosition >= MARGIN_ABOVE_EDITOR &&
    elementYPosition <= MARGIN_ABOVE_EDITOR + HEADING_WIDTH
  )
}

export const isHeadingAboveViewport = (element: HTMLElement): boolean => {
  const elementYPosition = element?.getClientRects()[0].y
  return elementYPosition < MARGIN_ABOVE_EDITOR
}

export const isHeadingBelowTheTopOfThePage = (element: HTMLElement): boolean => {
  const elementYPosition = element?.getClientRects()[0].y
  return elementYPosition >= MARGIN_ABOVE_EDITOR + HEADING_WIDTH
}
