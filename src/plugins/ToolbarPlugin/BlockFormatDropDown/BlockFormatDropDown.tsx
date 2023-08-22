import React, { $createCodeNode } from "@lexical/code"
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
  DEPRECATED_$isGridSelection,
  LexicalEditor,
} from "lexical"
import { Icon } from "../../../Icon/Icon"
import styleIcon from "../../../Icon/Icon.module.scss"
import { DropDown } from "../../../ui/DropDown/DropDown"
import stylesDropdown from "../../../ui/DropDown/DropDown.module.scss"
import { DropDownItem } from "../../../ui/DropDown/DropDownItem/DropDownItem"
import stylesToolbar from "../ToolbarPlugin.module.scss"
import { blockTypeToBlockName, rootTypeToRootName } from "../const"
import { dropDownActiveClass } from "../helpers"

type BlockFormatDropDownProps = {
  _rootType: keyof typeof rootTypeToRootName
  blockType: keyof typeof blockTypeToBlockName
  disabled?: boolean
  editor: LexicalEditor
}

export const BlockFormatDropDown = ({
  _rootType,
  blockType,
  disabled = false,
  editor,
}: BlockFormatDropDownProps) => {
  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode())
      }
    })
  }

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
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
        if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode())
        }
      })
    }
  }

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        let selection = $getSelection()

        if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode())
          } else {
            const textContent = selection.getTextContent()
            const codeNode = $createCodeNode()
            selection.insertNodes([codeNode])
            selection = $getSelection()
            if ($isRangeSelection(selection)) selection.insertRawText(textContent)
          }
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
    >
      <DropDownItem
        className={classNames(
          stylesDropdown.dropdownItem,
          dropDownActiveClass(blockType === "paragraph"),
        )}
        onClick={formatParagraph}
      >
        <Icon type="paragraph" />
        <span className={stylesDropdown.dropdownText}>Normal</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(stylesDropdown.dropdownItem, dropDownActiveClass(blockType === "h1"))}
        onClick={() => formatHeading("h1")}
      >
        <Icon type="h1" />
        <span className={stylesDropdown.dropdownText}>Heading 1</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(stylesDropdown.dropdownItem, dropDownActiveClass(blockType === "h2"))}
        onClick={() => formatHeading("h2")}
      >
        <Icon type="h2" />
        <span className={stylesDropdown.dropdownText}>Heading 2</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(stylesDropdown.dropdownItem, dropDownActiveClass(blockType === "h3"))}
        onClick={() => formatHeading("h3")}
      >
        <Icon type="h3" />
        <span className={stylesDropdown.dropdownText}>Heading 3</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(
          stylesDropdown.dropdownItem,
          dropDownActiveClass(blockType === "bullet"),
        )}
        onClick={formatBulletList}
      >
        <Icon type="bullet-list" />
        <span className={stylesDropdown.dropdownText}>Bullet List</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(
          stylesDropdown.dropdownItem,
          dropDownActiveClass(blockType === "number"),
        )}
        onClick={formatNumberedList}
      >
        <Icon type="numbered-list" />
        <span className={stylesDropdown.dropdownText}>Numbered List</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(
          stylesDropdown.dropdownItem,
          dropDownActiveClass(blockType === "check"),
        )}
        onClick={formatCheckList}
      >
        <Icon type="check-list" />
        <span className={stylesDropdown.dropdownText}>Check List</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(
          stylesDropdown.dropdownItem,
          dropDownActiveClass(blockType === "quote"),
        )}
        onClick={formatQuote}
      >
        <Icon type="quote" />
        <span className={stylesDropdown.dropdownText}>Quote</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(
          stylesDropdown.dropdownItem,
          dropDownActiveClass(blockType === "code"),
        )}
        onClick={formatCode}
      >
        <Icon type="code" />
        <span className={stylesDropdown.dropdownText}>Code Block</span>
      </DropDownItem>
    </DropDown>
  )
}
