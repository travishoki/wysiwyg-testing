import React from "react"
import classNames from "classnames"
import stylesTypeaheadPopover from "../../TypeaheadPopover/TypeaheadPopover.module.scss"
import { ComponentPickerOption } from "./ComponentPickerOption"

type ComponentPickerMenuItemProps = {
  index: number
  isSelected: boolean
  onClick: () => void
  onMouseEnter: () => void
  option: ComponentPickerOption
}

export const ComponentPickerMenuItem = ({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: ComponentPickerMenuItemProps) => {
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
      {option.icon}
      <span className={stylesTypeaheadPopover.text}>{option.title}</span>
    </li>
  )
}
