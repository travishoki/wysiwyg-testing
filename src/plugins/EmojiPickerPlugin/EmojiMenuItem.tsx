import * as React from "react"
import { EmojiOption } from "./EmojiOption"

type EmojiMenuItemProps = {
  index: number
  isSelected: boolean
  onClick: () => void
  onMouseEnter: () => void
  option: EmojiOption
}

export function EmojiMenuItem({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: EmojiMenuItemProps) {
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
      <span className="text">
        {option.emoji} {option.title}
      </span>
    </li>
  )
}
