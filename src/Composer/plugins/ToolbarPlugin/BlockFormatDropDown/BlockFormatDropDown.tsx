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
import styleIcon from "../../../Icon/Icon.module.scss"
import { IconStyled } from "../../../Icon/IconStyled/IconStyled"
import { DropDown } from "../../../ui/DropDown/DropDown"
import stylesDropdown from "../../../ui/DropDown/DropDown.module.scss"
import { DropDownItem } from "../../../ui/DropDown/DropDownItem/DropDownItem"
import { blockTypeToBlockName, rootTypeToRootName } from "../ToolbarPlugin.const"
import { dropDownActiveClass } from "../ToolbarPlugin.helpers"
import stylesToolbar from "../ToolbarPlugin.module.scss"

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
      hideLabelOnMobile
    >
      <DropDownItem
        className={classNames(
          stylesDropdown.dropdownItem,
          dropDownActiveClass(blockType === "paragraph"),
        )}
        onClick={formatParagraph}
      >
        <IconStyled type="paragraph" />
        <span className={stylesDropdown.dropdownText}>Normal</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(stylesDropdown.dropdownItem, dropDownActiveClass(blockType === "h1"))}
        onClick={() => formatHeading("h1")}
      >
        <IconStyled type="h1" />
        <span className={stylesDropdown.dropdownText}>Heading 1</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(stylesDropdown.dropdownItem, dropDownActiveClass(blockType === "h2"))}
        onClick={() => formatHeading("h2")}
      >
        <IconStyled type="h2" />
        <span className={stylesDropdown.dropdownText}>Heading 2</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(stylesDropdown.dropdownItem, dropDownActiveClass(blockType === "h3"))}
        onClick={() => formatHeading("h3")}
      >
        <IconStyled type="h3" />
        <span className={stylesDropdown.dropdownText}>Heading 3</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(
          stylesDropdown.dropdownItem,
          dropDownActiveClass(blockType === "bullet"),
        )}
        onClick={formatBulletList}
      >
        <IconStyled type="bullet-list" />
        <span className={stylesDropdown.dropdownText}>Bullet List</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(
          stylesDropdown.dropdownItem,
          dropDownActiveClass(blockType === "number"),
        )}
        onClick={formatNumberedList}
      >
        <IconStyled type="numbered-list" />
        <span className={stylesDropdown.dropdownText}>Numbered List</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(
          stylesDropdown.dropdownItem,
          dropDownActiveClass(blockType === "check"),
        )}
        onClick={formatCheckList}
      >
        <IconStyled type="check-list" />
        <span className={stylesDropdown.dropdownText}>Check List</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(
          stylesDropdown.dropdownItem,
          dropDownActiveClass(blockType === "quote"),
        )}
        onClick={formatQuote}
      >
        <IconStyled type="quote" />
        <span className={stylesDropdown.dropdownText}>Quote</span>
      </DropDownItem>
      <DropDownItem
        className={classNames(
          stylesDropdown.dropdownItem,
          dropDownActiveClass(blockType === "code"),
        )}
        onClick={formatCode}
      >
        <IconStyled type="code" />
        <span className={stylesDropdown.dropdownText}>Code Block</span>
      </DropDownItem>
    </DropDown>
  )
}
