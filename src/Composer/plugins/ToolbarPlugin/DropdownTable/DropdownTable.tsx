import React from "react"
import classNames from "classnames"
import { DropDown } from "../../../ui/DropDown/DropDown"
import stylesDropdown from "../../../ui/DropDown/DropDown.module.scss"
import { DropDownItem } from "../../../ui/DropDown/DropDownItem/DropDownItem"
import stylesIconDropdown from "../../../ui/DropDown/IconDropdown/IconDropdown.module.scss"
import stylesIcon from "../../../ui/Icon/Icon.module.scss"
import stylesToolbarPlugin from "../ToolbarPlugin.module.scss"

type DropdownTableProps = {
  isEditable: boolean
}

export const DropdownTable = ({ isEditable }: DropdownTableProps) => {
  return (
    <DropDown
      buttonAriaLabel="Open table toolkit"
      buttonClassName={classNames(stylesToolbarPlugin.toolbarItem, stylesToolbarPlugin.spaced)}
      buttonIconClassName={classNames(stylesIconDropdown.icon, stylesIcon.table)}
      buttonLabel="Table"
      disabled={!isEditable}
    >
      <DropDownItem
        className={stylesDropdown.dropdownItem}
        onClick={() => {
          /**/
        }}
      >
        <span className={stylesDropdown.dropdownText}>TODO</span>
      </DropDownItem>
    </DropDown>
  )
}
