import React from "react"
import classNames from "classnames"
import stylesTypeaheadPopover from "../../../TypeaheadPopover/TypeaheadPopover.module.scss"
import { MentionTypeaheadOption } from "../MentionTypeaheadOption"

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
      aria-selected={isSelected}
      className={classNames(isSelected ? stylesTypeaheadPopover.selected : "")}
      id={"typeahead-item-" + index}
      key={option.key}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      ref={option.setRefElement}
      role="option"
      tabIndex={-1}
    >
      {option.picture}
      <span className={stylesTypeaheadPopover.text}>{option.name}</span>
    </li>
  )
}
