import React from "react"
import { AutoEmbedOption } from "@lexical/react/LexicalAutoEmbedPlugin"
import { TypeaheadPopover } from "../../../ui/TypeaheadPopover/TypeaheadPopover"
import { AutoEmbedMenuItem } from "../AutoEmbedMenuItem/AutoEmbedMenuItem"

type AutoEmbedMenuProps = {
  onOptionClick: (option: AutoEmbedOption, index: number) => void
  onOptionMouseEnter: (index: number) => void
  options: Array<AutoEmbedOption>
  selectedItemIndex: number | null
}

export const AutoEmbedMenu = ({
  onOptionClick,
  onOptionMouseEnter,
  options,
  selectedItemIndex,
}: AutoEmbedMenuProps) => {
  return (
    <TypeaheadPopover>
      <ul>
        {options.map((option: AutoEmbedOption, i: number) => (
          <AutoEmbedMenuItem
            key={option.key}
            index={i}
            isSelected={selectedItemIndex === i}
            onClick={() => onOptionClick(option, i)}
            onMouseEnter={() => onOptionMouseEnter(i)}
            option={option}
          />
        ))}
      </ul>
    </TypeaheadPopover>
  )
}
