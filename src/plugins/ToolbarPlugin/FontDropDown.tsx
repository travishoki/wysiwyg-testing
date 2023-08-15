import * as React from "react"
import { useCallback } from "react"
import { $patchStyleText } from "@lexical/selection"
import { $getSelection, $isRangeSelection } from "lexical"
import { DropDown } from "../../ui/DropDown/DropDown"
import { DropDownItem } from "../../ui/DropDown/DropDownItem"
import { dropDownActiveClass } from "./helpers"
import type { LexicalEditor } from "lexical"

const FONT_FAMILY_OPTIONS: [string, string][] = [
  ["Arial", "Arial"],
  ["Courier New", "Courier New"],
  ["Georgia", "Georgia"],
  ["Times New Roman", "Times New Roman"],
  ["Trebuchet MS", "Trebuchet MS"],
  ["Verdana", "Verdana"],
]

const FONT_SIZE_OPTIONS: [string, string][] = [
  ["10px", "10px"],
  ["11px", "11px"],
  ["12px", "12px"],
  ["13px", "13px"],
  ["14px", "14px"],
  ["15px", "15px"],
  ["16px", "16px"],
  ["17px", "17px"],
  ["18px", "18px"],
  ["19px", "19px"],
  ["20px", "20px"],
]

type FontDropDownProps = {
  editor: LexicalEditor
  value: string
  styleName: string
  disabled?: boolean
}

export const FontDropDown = ({ editor, value, styleName, disabled = false }: FontDropDownProps) => {
  const handleClick = useCallback(
    (option: string) => {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            [styleName]: option,
          })
        }
      })
    },
    [editor, styleName],
  )

  const buttonAriaLabel =
    styleName === "font-family"
      ? "Formatting options for font family"
      : "Formatting options for font size"

  return (
    <DropDown
      disabled={disabled}
      buttonClassName={"toolbar-item " + styleName}
      buttonLabel={value}
      buttonIconClassName={styleName === "font-family" ? "icon block-type font-family" : ""}
      buttonAriaLabel={buttonAriaLabel}
    >
      {(styleName === "font-family" ? FONT_FAMILY_OPTIONS : FONT_SIZE_OPTIONS).map(
        ([option, text]) => (
          <DropDownItem
            className={`item ${dropDownActiveClass(value === option)} ${
              styleName === "font-size" ? "fontsize-item" : ""
            }`}
            onClick={() => handleClick(option)}
            key={option}
          >
            <span className="text">{text}</span>
          </DropDownItem>
        ),
      )}
    </DropDown>
  )
}
