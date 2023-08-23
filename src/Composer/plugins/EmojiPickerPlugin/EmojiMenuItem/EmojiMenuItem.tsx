import React from "react"
import classNames from "classnames"
import stylesTypeaheadPopover from "../../../ui/TypeaheadPopover/TypeaheadPopover.module.scss"
import { EmojiOption } from "../EmojiOption/EmojiOption"

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
  return (
    <li
      aria-selected={isSelected}
      className={classNames(isSelected ? stylesTypeaheadPopover.selected : "")}
      id={`typeahead-item-${  index}`}
      key={option.key}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      ref={option.setRefElement}
      role="option"
      tabIndex={-1}
    >
      <span className={stylesTypeaheadPopover.text}>
        {option.emoji} {option.title}
      </span>
    </li>
  )
}
