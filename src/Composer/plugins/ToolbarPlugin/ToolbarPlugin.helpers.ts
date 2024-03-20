import styles from "./ToolbarPlugin.module.scss"

export const dropDownActiveClass = (active: boolean) => {
  if (active) return styles.dropdownItemActive

  return ""
}
