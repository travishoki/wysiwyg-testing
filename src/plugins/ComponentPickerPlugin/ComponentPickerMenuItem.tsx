import * as React from "react"
import { ComponentPickerOption } from "./ComponentPickerOption"

type ComponentPickerMenuItemProps = {
  index: number
  isSelected: boolean
  onClick: () => void
  onMouseEnter: () => void
  option: ComponentPickerOption
}

export const ComponentPickerMenuItem = ({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: ComponentPickerMenuItemProps) => {
  let className = "item"
  if (isSelected) {
    className += " selected"
  }
  return (
    <li
      key={option.key}
      tabIndex={-1}
      className={className}
      ref={option.setRefElement}
      role="option"
      aria-selected={isSelected}
      id={"typeahead-item-" + index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      {option.icon}
      <span className="text">{option.title}</span>
    </li>
  )
}
