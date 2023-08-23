import React from "react"
import { getLanguageFriendlyName } from "@lexical/code"
import classNames from "classnames"
import { DropDown } from "../../../ui/DropDown/DropDown"
import stylesDropdown from "../../../ui/DropDown/DropDown.module.scss"
import { DropDownItem } from "../../../ui/DropDown/DropDownItem/DropDownItem"
import { dropDownActiveClass } from "../ToolbarPlugin.helpers"
import stylesToolbarPlugin from "../ToolbarPlugin.module.scss"
import { getCodeLanguageOptions } from "./DropdownCode.helpers"

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions()

type DropdownCodeProps = {
  codeLanguage: string
  isEditable: boolean
  onCodeLanguageSelect: (value: string) => void
}

export const DropdownCode = ({
  codeLanguage,
  isEditable,
  onCodeLanguageSelect,
}: DropdownCodeProps) => {
  return (
    <DropDown
      buttonAriaLabel="Select language"
      buttonClassName={classNames(
        stylesToolbarPlugin.toolbarItem,
        stylesToolbarPlugin.codeLanguage,
      )}
      buttonLabel={getLanguageFriendlyName(codeLanguage)}
      disabled={!isEditable}
    >
      {CODE_LANGUAGE_OPTIONS.map(([value, name]) => {
        return (
          <DropDownItem
            className={classNames(
              stylesDropdown.dropdownItem,
              `item ${dropDownActiveClass(value === codeLanguage)}`,
            )}
            key={value}
            onClick={() => onCodeLanguageSelect(value)}
          >
            <span className={stylesDropdown.dropdownText}>{name}</span>
          </DropDownItem>
        )
      })}
    </DropDown>
  )
}
