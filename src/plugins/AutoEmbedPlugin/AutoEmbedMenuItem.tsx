import * as React from "react"
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
