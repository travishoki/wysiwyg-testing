import React from "react"
import classNames from "classnames"
import stylesTypeaheadPopover from "../../TypeaheadPopover/TypeaheadPopover.module.scss"
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

  return (
    <li
      aria-selected={isSelected}
      className={classNames(className, isSelected ? stylesTypeaheadPopover.selected : "")}
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
