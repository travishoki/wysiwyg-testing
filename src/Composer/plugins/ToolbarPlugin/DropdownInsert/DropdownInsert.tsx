import React from "react"
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode"
import classNames from "classnames"
import { LexicalEditor } from "lexical"
import { useTranslation } from "src/i18n"
import { showModalType } from "../../../hooks/useModal"
import { DropDown } from "../../../ui/DropDown/DropDown"
import stylesDropdown from "../../../ui/DropDown/DropDown.module.scss"
import { DropDownItem } from "../../../ui/DropDown/DropDownItem/DropDownItem"
import { IconDropdown } from "../../../ui/DropDown/IconDropdown/IconDropdown"
import stylesIconDropdown from "../../../ui/DropDown/IconDropdown/IconDropdown.module.scss"
import stylesIcon from "../../../ui/Icon/Icon.module.scss"
import { InsertImageDialog } from "../../ImagesPlugin/InsertImageDialog/InsertImageDialog"
import { InsertInlineImageDialog } from "../../InlineImagePlugin/InsertInlineImageDialog/InsertInlineImageDialog"
import { InsertTableDialog } from "../../TablePlugin/InsertTableDialog/InsertTableDialog"
import stylesToolbarPlugin from "../ToolbarPlugin.module.scss"

type DropdownInsertProps = {
  activeEditor: LexicalEditor
  isEditable: boolean
  showModal: showModalType
}

export const DropdownInsert = ({ activeEditor, isEditable, showModal }: DropdownInsertProps) => {
  const { t } = useTranslation("scenes", { keyPrefix: "composer" })

  return (
    <DropDown
      buttonAriaLabel={t("Insert specialized editor node")}
      buttonClassName={classNames(stylesToolbarPlugin.toolbarItem, stylesToolbarPlugin.spaced)}
      buttonIconClassName={classNames(stylesIconDropdown.icon, stylesIcon.plus)}
      buttonLabel={t("Insert")}
      disabled={!isEditable}
      hideLabelOnMobile
    >
      <DropDownItem
        className={stylesDropdown.dropdownItem}
        onClick={() => {
          activeEditor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)
        }}
      >
        <IconDropdown type="horizontal-rule" />
        <span className={stylesDropdown.dropdownText}>{t("Horizontal Rule")}</span>
      </DropDownItem>
      <DropDownItem
        className={stylesDropdown.dropdownItem}
        onClick={() => {
          showModal(t("Insert Image"), (onClose) => (
            <InsertImageDialog activeEditor={activeEditor} onClose={onClose} />
          ))
        }}
      >
        <IconDropdown type="image" />
        <span className={stylesDropdown.dropdownText}>{t("Image")}</span>
      </DropDownItem>
      <DropDownItem
        className={stylesDropdown.dropdownItem}
        onClick={() => {
          showModal("Insert Inline Image", (onClose) => (
            <InsertInlineImageDialog activeEditor={activeEditor} onClose={onClose} />
          ))
        }}
      >
        <IconDropdown type="image" />
        <span className={stylesDropdown.dropdownText}>Inline Image</span>
      </DropDownItem>
      <DropDownItem
        className={stylesDropdown.dropdownItem}
        onClick={() => {
          showModal(t("Insert Table"), (onClose) => (
            <InsertTableDialog activeEditor={activeEditor} onClose={onClose} />
          ))
        }}
      >
        <IconDropdown type="table" />
        <span className={stylesDropdown.dropdownText}>{t("Table")}</span>
      </DropDownItem>
    </DropDown>
  )
}
