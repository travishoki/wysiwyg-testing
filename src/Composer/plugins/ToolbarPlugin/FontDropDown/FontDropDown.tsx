import React, { useCallback } from "react"
import { $patchStyleText } from "@lexical/selection"
import classNames from "classnames"
import { $getSelection, $isRangeSelection, LexicalEditor } from "lexical"
import stylesIcon from "../../../Icon/Icon.module.scss"
import { DropDown } from "../../../ui/DropDown/DropDown"
import stylesDropdown from "../../../ui/DropDown/DropDown.module.scss"
import { DropDownItem } from "../../../ui/DropDown/DropDownItem/DropDownItem"
import { dropDownActiveClass } from "../ToolbarPlugin.helpers"
import stylesToolbar from "../ToolbarPlugin.module.scss"
import { FONT_FAMILY_OPTIONS, FONT_SIZE_OPTIONS } from "./FontDropDown.const"
import styles from "./FontDropDown.module.scss"

type FontDropDownProps = {
  disabled?: boolean
  editor: LexicalEditor
  styleName: string
  value: string
}

export const FontDropDown = ({ disabled = false, editor, styleName, value }: FontDropDownProps) => {
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
      buttonAriaLabel={buttonAriaLabel}
      buttonClassName={classNames(stylesToolbar.toolbarItem, styleName)}
      buttonIconClassName={
        styleName === "font-family" ? classNames(stylesToolbar.icon, stylesIcon["font-family"]) : ""
      }
      buttonLabel={value}
      disabled={disabled}
      hideLabelOnMobile={styleName === "font-family"}
    >
      {(styleName === "font-family" ? FONT_FAMILY_OPTIONS : FONT_SIZE_OPTIONS).map(
        ([option, text]) => (
          <DropDownItem
            className={classNames(
              stylesDropdown.dropdownItem,
              dropDownActiveClass(value === option),
              `${styleName === "font-size" ? styles.fontsizeItem : ""}`,
            )}
            key={option}
            onClick={() => handleClick(option)}
          >
            <span
              className={classNames(
                stylesDropdown.dropdownText,
                `${styleName === "font-size" ? styles.fontsizeItemText : ""}`,
              )}
            >
              {text}
            </span>
          </DropDownItem>
        ),
      )}
    </DropDown>
  )
}
