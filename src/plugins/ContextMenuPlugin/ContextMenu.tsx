import React from "react"
import { ContextMenuItem } from "./ContextMenuItem"
import { ContextMenuOption } from "./ContextMenuOption"

type ContextMenuProps = {
  onOptionClick: (option: ContextMenuOption, index: number) => void
  onOptionMouseEnter: (index: number) => void
  options: Array<ContextMenuOption>
  selectedItemIndex: number | null
}

export const ContextMenu = ({
  onOptionClick,
  onOptionMouseEnter,
  options,
  selectedItemIndex,
}: ContextMenuProps) => {
  return (
    <div className="typeahead-popover">
      <ul>
        {options.map((option: ContextMenuOption, i: number) => (
          <ContextMenuItem
            index={i}
            isSelected={selectedItemIndex === i}
            key={option.key}
            onClick={() => onOptionClick(option, i)}
            onMouseEnter={() => onOptionMouseEnter(i)}
            option={option}
          />
        ))}
      </ul>
    </div>
  )
}
