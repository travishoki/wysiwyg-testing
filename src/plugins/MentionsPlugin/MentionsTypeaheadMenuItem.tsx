import React from "react"
import classNames from "classnames"
import { MentionTypeaheadOption } from "./MentionTypeaheadOption"
import stylesTypeaheadPopover from "../../TypeaheadPopover/TypeaheadPopover.module.scss"

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
      {option.picture}
      <span className="text">{option.name}</span>
    </li>
  )
}
