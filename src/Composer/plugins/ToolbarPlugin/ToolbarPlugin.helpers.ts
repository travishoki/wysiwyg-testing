import { RangeSelection } from "lexical"
import styles from "./ToolbarPlugin.module.scss"

export const dropDownActiveClass = (active: boolean) => {
  if (active) return styles.dropdownItemActive

  return ""
}

export const getIsPureBlockType = (selection: RangeSelection) => {
  return (
    !selection.hasFormat("bold") &&
    !selection.hasFormat("italic") &&
    !selection.hasFormat("underline") &&
    !selection.hasFormat("strikethrough") &&
    !selection.hasFormat("subscript") &&
    !selection.hasFormat("superscript")
  )
}
