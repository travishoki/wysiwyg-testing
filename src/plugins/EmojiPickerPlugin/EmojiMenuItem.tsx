import * as React from "react"
import { EmojiOption } from "./EmojiOption"

type EmojiMenuItemProps = {
  index: number
  isSelected: boolean
  onClick: () => void
  onMouseEnter: () => void
  option: EmojiOption
}

export const EmojiMenuItem = ({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: EmojiMenuItemProps) => {
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
      <span className="text">
        {option.emoji} {option.title}
      </span>
    </li>
  )
}
