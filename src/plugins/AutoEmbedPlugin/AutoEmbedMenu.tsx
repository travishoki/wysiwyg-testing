import * as React from "react"
import { AutoEmbedOption } from "@lexical/react/LexicalAutoEmbedPlugin"
import { AutoEmbedMenuItem } from "./AutoEmbedMenuItem"

type AutoEmbedMenuProps = {
  onOptionClick: (option: AutoEmbedOption, index: number) => void,
  onOptionMouseEnter: (index: number) => void,
  options: Array<AutoEmbedOption>,
  selectedItemIndex: number | null
}

export const AutoEmbedMenu = ({
  options,
  selectedItemIndex,
  onOptionClick,
  onOptionMouseEnter,
}: AutoEmbedMenuProps) => {
  return (
    <div className="typeahead-popover">
      <ul>
        {options.map((option: AutoEmbedOption, i: number) => (
          <AutoEmbedMenuItem
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
