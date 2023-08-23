import React from "react"
import { AutoEmbedOption } from "@lexical/react/LexicalAutoEmbedPlugin"
import classNames from "classnames"
import stylesTypeaheadPopover from "../../../ui/TypeaheadPopover/TypeaheadPopover.module.scss"

type AutoEmbedMenuItemProps = {
  index: number
  isSelected: boolean
  onClick: () => void
  onMouseEnter: () => void
  option: AutoEmbedOption
}

export const AutoEmbedMenuItem = ({
  index,
  isSelected,
  onClick,
  onMouseEnter,
  option,
}: AutoEmbedMenuItemProps) => {
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
      <span className={stylesTypeaheadPopover.text}>{option.title}</span>
    </li>
  )
}
