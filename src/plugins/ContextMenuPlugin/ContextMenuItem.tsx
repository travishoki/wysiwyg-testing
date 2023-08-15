import * as React from "react"
import { ContextMenuOption } from "./ContextMenuOption"

type ContextMenuItemProps = {
  index: number
  isSelected: boolean
  onClick: () => void
  onMouseEnter: () => void
  option: ContextMenuOption
}

export const ContextMenuItem = ({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: ContextMenuItemProps) => {
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
      <span className="text">{option.title}</span>
    </li>
  )
}
