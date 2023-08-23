import React from "react"
import classNames from "classnames"
import {
  FORMAT_ELEMENT_COMMAND,
  INDENT_CONTENT_COMMAND,
  LexicalEditor,
  OUTDENT_CONTENT_COMMAND,
} from "lexical"
import { DropDown } from "../../../ui/DropDown/DropDown"
import stylesDropdown from "../../../ui/DropDown/DropDown.module.scss"
import { DropDownItem } from "../../../ui/DropDown/DropDownItem/DropDownItem"
import { IconDropdown } from "../../../ui/DropDown/IconDropdown/IconDropdown"
import stylesIconDropdown from "../../../ui/DropDown/IconDropdown/IconDropdown.module.scss"
import stylesIcon from "../../../ui/Icon/Icon.module.scss"
import stylesToolbarPlugin from "../ToolbarPlugin.module.scss"
import styles from "./DropDownTextAlignment.module.scss"

type DropdownInsertProps = {
  activeEditor: LexicalEditor
  isEditable: boolean
  isRTL: boolean
}

export const DropDownTextAlignment = ({ activeEditor, isEditable, isRTL }: DropdownInsertProps) => {
  return (
    <DropDown
      buttonAriaLabel="Formatting options for text alignment"
      buttonClassName={classNames(
        stylesToolbarPlugin.toolbarItem,
        stylesToolbarPlugin.spaced,
        "alignment",
      )}
      buttonIconClassName={classNames(stylesIconDropdown.icon, stylesIcon["left-align"])}
      buttonLabel="Align"
      disabled={!isEditable}
      hideLabelOnMobile
    >
      <DropDownItem
        className={stylesDropdown.dropdownItem}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")
        }}
      >
        <IconDropdown type="left-align" />
        <span className={stylesDropdown.dropdownText}>Left Align</span>
      </DropDownItem>
      <DropDownItem
        className={stylesDropdown.dropdownItem}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
        }}
      >
        <IconDropdown type="center-align" />
        <span className={stylesDropdown.dropdownText}>Center Align</span>
      </DropDownItem>
      <DropDownItem
        className={stylesDropdown.dropdownItem}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
        }}
      >
        <IconDropdown type="right-align" />
        <span className={stylesDropdown.dropdownText}>Right Align</span>
      </DropDownItem>
      <DropDownItem
        className={stylesDropdown.dropdownItem}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
        }}
      >
        <IconDropdown type="justify-align" />
        <span className={stylesDropdown.dropdownText}>Justify Align</span>
      </DropDownItem>
      <div className={styles.divider} />
      <DropDownItem
        className={stylesDropdown.dropdownItem}
        onClick={() => {
          activeEditor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)
        }}
      >
        <IconDropdown type={isRTL ? "indent" : "outdent"} />
        <span className={stylesDropdown.dropdownText}>Outdent</span>
      </DropDownItem>
      <DropDownItem
        className={stylesDropdown.dropdownItem}
        onClick={() => {
          activeEditor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)
        }}
      >
        <IconDropdown type={isRTL ? "outdent" : "indent"} />
        <span className={stylesDropdown.dropdownText}>Indent</span>
      </DropDownItem>
    </DropDown>
  )
}
