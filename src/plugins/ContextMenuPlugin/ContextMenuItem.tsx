import React from "react"
import classNames from "classnames"
import stylesTypeaheadPopover from "../../TypeaheadPopover/TypeaheadPopover.module.scss"
import { ContextMenuOption } from "./ContextMenuOption"

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
      <span className={stylesTypeaheadPopover.text}>{option.title}</span>
    </li>
  )
}
