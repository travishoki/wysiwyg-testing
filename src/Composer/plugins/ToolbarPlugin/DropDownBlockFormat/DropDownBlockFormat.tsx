import React from "@lexical/code"
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list"
import { $createHeadingNode, $createQuoteNode, HeadingTagType } from "@lexical/rich-text"
import { $setBlocksType } from "@lexical/selection"
import classNames from "classnames"
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  DEPRECATED_$isGridSelection as $isGridSelection,
  LexicalEditor,
} from "lexical"
import { useTranslation } from "src/i18n"
import { $isMergeFieldNode } from "../../../nodes/MergeField/MergeFieldNode"
import { DropDown } from "../../../ui/DropDown/DropDown"
import stylesDropdown from "../../../ui/DropDown/DropDown.module.scss"
import { DropDownItem } from "../../../ui/DropDown/DropDownItem/DropDownItem"
import { IconDropdown } from "../../../ui/DropDown/IconDropdown/IconDropdown"
import styleIcon from "../../../ui/Icon/Icon.module.scss"
import { blockTypeToBlockName } from "../ToolbarPlugin.const"
import { dropDownActiveClass } from "../ToolbarPlugin.helpers"
import stylesToolbar from "../ToolbarPlugin.module.scss"

type DropDownBlockFormatProps = {
  blockType: keyof typeof blockTypeToBlockName
  disabled?: boolean
  editor: LexicalEditor
}

export const DropDownBlockFormat = ({
  blockType,
  disabled = false,
  editor,
}: DropDownBlockFormatProps) => {
  const { t } = useTranslation("scenes", { keyPrefix: "composer" })

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection()

      // Style MergeFields
      selection?.getNodes().forEach((node) => {
        if ($isMergeFieldNode(node)) {
          node.setTag("")
          node.setFormat(0)
        }
      })

      // Style TextNode
      if ($isRangeSelection(selection) || $isGridSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode())
      }
    })
  }

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection()

        // Style MergeFields
        selection?.getNodes().forEach((node) => {
          if ($isMergeFieldNode(node)) {
            node.setTag(headingSize)
            node.setFormat(0)
          }
        })

        // Style TextNode
        if ($isRangeSelection(selection) || $isGridSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize))
        }
      })
    }
  }

  const formatBulletList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const formatCheckList = () => {
    if (blockType !== "check") {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)
    }
  }

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection) || $isGridSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode())
        }
      })
    }
  }

  return (
    <DropDown
      buttonAriaLabel="Formatting options for text style"
      buttonClassName={stylesToolbar.toolbarItem}
      buttonIconClassName={classNames(stylesToolbar.icon, styleIcon[blockType])}
      buttonLabel={blockTypeToBlockName[blockType]}
      disabled={disabled}
      hideLabelOnMobile
    >
      <DropDownItem
        className={classNames(
          stylesDropdown.dropdownItem,
          dropDownActiveClass(blockType === "paragraph"),
        )}
        onClick={formatParagraph}
      >
        <IconDropdown type="paragraph" />
        <span className={stylesDropdown.dropdownText}>{t("Normal")}</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(stylesDropdown.dropdownItem, dropDownActiveClass(blockType === "h1"))}
        onClick={() => formatHeading("h1")}
      >
        <IconDropdown type="h1" />
        <span className={stylesDropdown.dropdownText}>{t("Heading 1")}</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(stylesDropdown.dropdownItem, dropDownActiveClass(blockType === "h2"))}
        onClick={() => formatHeading("h2")}
      >
        <IconDropdown type="h2" />
        <span className={stylesDropdown.dropdownText}>{t("Heading 2")}</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(stylesDropdown.dropdownItem, dropDownActiveClass(blockType === "h3"))}
        onClick={() => formatHeading("h3")}
      >
        <IconDropdown type="h3" />
        <span className={stylesDropdown.dropdownText}>{t("Heading 3")}</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(
          stylesDropdown.dropdownItem,
          dropDownActiveClass(blockType === "bullet"),
        )}
        onClick={formatBulletList}
      >
        <IconDropdown type="bullet-list" />
        <span className={stylesDropdown.dropdownText}>{t("Bullet List")}</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(
          stylesDropdown.dropdownItem,
          dropDownActiveClass(blockType === "number"),
        )}
        onClick={formatNumberedList}
      >
        <IconDropdown type="numbered-list" />
        <span className={stylesDropdown.dropdownText}>{t("Numbered List")}</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(
          stylesDropdown.dropdownItem,
          dropDownActiveClass(blockType === "check"),
        )}
        onClick={formatCheckList}
      >
        <IconDropdown type="check-list" />
        <span className={stylesDropdown.dropdownText}>{t("Check List")}</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(
          stylesDropdown.dropdownItem,
          dropDownActiveClass(blockType === "quote"),
        )}
        onClick={formatQuote}
      >
        <IconDropdown type="quote" />
        <span className={stylesDropdown.dropdownText}>{t("Quote")}</span>
      </DropDownItem>
    </DropDown>
  )
}
