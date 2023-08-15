import * as React from "react"
import { ContextMenuItem } from "./ContextMenuItem"
import { ContextMenuOption } from "./ContextMenuOption"

type ContextMenuProps = {
  selectedItemIndex: number | null
  onOptionClick: (option: ContextMenuOption, index: number) => void
  onOptionMouseEnter: (index: number) => void
  options: Array<ContextMenuOption>
}

export function ContextMenu({
  options,
  selectedItemIndex,
  onOptionClick,
  onOptionMouseEnter,
}: ContextMenuProps) {
  return (
    <div className="typeahead-popover">
      <ul>
        {options.map((option: ContextMenuOption, i: number) => (
          <ContextMenuItem
            index={i}
            isSelected={selectedItemIndex === i}
            onClick={() => onOptionClick(option, i)}
            onMouseEnter={() => onOptionMouseEnter(i)}
            key={option.key}
            option={option}
          />
        ))}
      </ul>
    </div>
  )
}
