import React from "react"
import classNames from "classnames"
import stylesTypeaheadPopover from "../../../ui/TypeaheadPopover/TypeaheadPopover.module.scss"
import { MentionTypeaheadOption } from "../MentionTypeaheadOption/MentionTypeaheadOption"

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
  return (
    <li
      className={classNames(isSelected ? stylesTypeaheadPopover.selected : "")}
      id={`typeahead-item-${index}`}
    >
      <button
        aria-selected={isSelected}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        ref={option.setRefElement}
        role="option"
      >
        {option.picture}
        <span className={stylesTypeaheadPopover.text}>{option.name}</span>
      </button>
    </li>
  )
}
