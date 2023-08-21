import React from "react"
import classNames from "classnames"
import { ContextMenuOption } from "./ContextMenuOption"
import stylesTypeaheadPopover from "../../TypeaheadPopover/TypeaheadPopover.module.scss"

type ContextMenuItemProps = {
  index: number
  isSelected: boolean
  onClick: () => void
  onMouseEnter: () => void
  option: ContextMenuOption
}

export const ContextMenuItem = ({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: ContextMenuItemProps) => {
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
      <span className="text">{option.title}</span>
    </li>
  )
}
