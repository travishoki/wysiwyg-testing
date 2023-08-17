import React from "react"
import { AutoEmbedOption } from "@lexical/react/LexicalAutoEmbedPlugin"

type AutoEmbedMenuItemProps = {
  index: number
  isSelected: boolean
  onClick: () => void
  onMouseEnter: () => void
  option: AutoEmbedOption
}

export const AutoEmbedMenuItem = ({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: AutoEmbedMenuItemProps) => {
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
