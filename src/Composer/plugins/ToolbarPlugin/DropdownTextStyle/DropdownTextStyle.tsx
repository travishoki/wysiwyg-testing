import React from "react"
import classNames from "classnames"
import { FORMAT_TEXT_COMMAND, LexicalEditor } from "lexical"
import { useTranslation } from "src/i18n"
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
  const { t } = useTranslation("scenes", { keyPrefix: "composer" })

  return (
    <DropDown
      buttonAriaLabel={t("Formatting options for additional text styles")}
      buttonClassName={classNames(stylesToolbarPlugin.toolbarItem, stylesToolbarPlugin.spaced)}
      buttonIconClassName={classNames(stylesIconDropdown.icon, stylesIcon["dropdown-more"])}
      buttonLabel={t("Text formatting")}
      disabled={!isEditable}
    >
      <DropDownItem
        aria-label={t("Format text with a strikethrough")}
        className={classNames(stylesDropdown.dropdownItem, dropDownActiveClass(isStrikethrough))}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }}
        title="Strikethrough"
      >
        <IconDropdown type="strikethrough" />
        <span className={stylesDropdown.dropdownText}>{t("Strikethrough")}</span>
      </DropDownItem>
      <DropDownItem
        aria-label={t("Format text with a subscript")}
        className={classNames(stylesDropdown.dropdownItem, dropDownActiveClass(isSubscript))}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")
        }}
        title={t("Subscript")}
      >
        <IconDropdown type="subscript" />
        <span className={stylesDropdown.dropdownText}>{t("Subscript")}</span>
      </DropDownItem>
      <DropDownItem
        aria-label={t("Format text with a superscript")}
        className={classNames(stylesDropdown.dropdownItem, dropDownActiveClass(isSuperscript))}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")
        }}
        title={t("Superscript")}
      >
        <IconDropdown type="superscript" />
        <span className={stylesDropdown.dropdownText}>{t("Superscript")}</span>
      </DropDownItem>
      <DropDownItem
        aria-label={t("Clear all text formatting")}
        className={stylesDropdown.dropdownItem}
        onClick={clearFormatting}
        title={t("Clear text formatting")}
      >
        <IconDropdown type="clear" />
        <span className={stylesDropdown.dropdownText}>{t("Clear text formatting")}</span>
      </DropDownItem>
    </DropDown>
  )
}
