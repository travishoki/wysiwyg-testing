import React from "react"
import classNames from "classnames"
import { FORMAT_TEXT_COMMAND, LexicalEditor } from "lexical"
import { DropDown } from "../../../ui/DropDown/DropDown"
import stylesDropdown from "../../../ui/DropDown/DropDown.module.scss"
import { DropDownItem } from "../../../ui/DropDown/DropDownItem/DropDownItem"
import { IconDropdown } from "../../../ui/DropDown/IconDropdown/IconDropdown"
import stylesIconDropdown from "../../../ui/DropDown/IconDropdown/IconDropdown.module.scss"
import stylesIcon from "../../../ui/Icon/Icon.module.scss"
import { dropDownActiveClass } from "../ToolbarPlugin.helpers"
import stylesToolbarPlugin from "../ToolbarPlugin.module.scss"

type DropdownTextStyleProps = {
  activeEditor: LexicalEditor
  clearFormatting: () => void
  isEditable: boolean
  isStrikethrough: boolean
  isSubscript: boolean
  isSuperscript: boolean
}

export const DropdownTextStyle = ({
  activeEditor,
  clearFormatting,
  isEditable,
  isStrikethrough,
  isSubscript,
  isSuperscript,
}: DropdownTextStyleProps) => {
  return (
    <DropDown
      buttonAriaLabel="Formatting options for additional text styles"
      buttonClassName={classNames(stylesToolbarPlugin.toolbarItem, stylesToolbarPlugin.spaced)}
      buttonIconClassName={classNames(stylesIconDropdown.icon, stylesIcon["dropdown-more"])}
      buttonLabel=""
      disabled={!isEditable}
    >
      <DropDownItem
        aria-label="Format text with a strikethrough"
        className={classNames(stylesDropdown.dropdownItem, dropDownActiveClass(isStrikethrough))}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }}
        title="Strikethrough"
      >
        <IconDropdown type="strikethrough" />
        <span className={stylesDropdown.dropdownText}>Strikethrough</span>
      </DropDownItem>
      <DropDownItem
        aria-label="Format text with a subscript"
        className={classNames(stylesDropdown.dropdownItem, dropDownActiveClass(isSubscript))}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")
        }}
        title="Subscript"
      >
        <IconDropdown type="subscript" />
        <span className={stylesDropdown.dropdownText}>Subscript</span>
      </DropDownItem>
      <DropDownItem
        aria-label="Format text with a superscript"
        className={classNames(stylesDropdown.dropdownItem, dropDownActiveClass(isSuperscript))}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")
        }}
        title="Superscript"
      >
        <IconDropdown type="superscript" />
        <span className={stylesDropdown.dropdownText}>Superscript</span>
      </DropDownItem>
      <DropDownItem
        aria-label="Clear all text formatting"
        className={stylesDropdown.dropdownItem}
        onClick={clearFormatting}
        title="Clear text formatting"
      >
        <IconDropdown type="clear" />
        <span className={stylesDropdown.dropdownText}>Clear Formatting</span>
      </DropDownItem>
    </DropDown>
  )
}
