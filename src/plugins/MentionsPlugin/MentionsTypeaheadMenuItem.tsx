import React from "react"
import { MentionTypeaheadOption } from "./MentionTypeaheadOption"

type MentionsTypeaheadMenuItemProps = {
  index: number
  isSelected: boolean
  onClick: () => void
  onMouseEnter: () => void
  option: MentionTypeaheadOption
}

export const MentionsTypeaheadMenuItem = ({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: MentionsTypeaheadMenuItemProps) => {
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
      {option.picture}
      <span className="text">{option.name}</span>
    </li>
  )
}
