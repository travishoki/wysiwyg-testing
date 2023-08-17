import React from "react"
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
      aria-selected={isSelected}
      className={className}
      id={"typeahead-item-" + index}
      key={option.key}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      ref={option.setRefElement}
      role="option"
      tabIndex={-1}
    >
      <span className="text">{option.title}</span>
    </li>
  )
}
