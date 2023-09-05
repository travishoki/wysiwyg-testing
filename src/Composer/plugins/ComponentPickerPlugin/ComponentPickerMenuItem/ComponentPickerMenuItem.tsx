import React from "react"
import classNames from "classnames"
import stylesTypeaheadPopover from "../../../ui/TypeaheadPopover/TypeaheadPopover.module.scss"
import { ComponentPickerOption } from "../ComponentPickerOption/ComponentPickerOption"

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
        {option.icon}
        <span className={stylesTypeaheadPopover.text}>{option.title}</span>
      </button>
    </li>
  )
}
