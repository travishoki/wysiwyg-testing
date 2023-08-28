/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useCallback, useEffect, useState } from "react"
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link"
import { $isListNode, ListNode } from "@lexical/list"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $isDecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode"
import { $isHeadingNode, $isQuoteNode } from "@lexical/rich-text"
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
} from "@lexical/selection"
import { $isTableNode } from "@lexical/table"
import {
  $findMatchingParent,
  $getNearestBlockElementAncestorOrThrow,
  $getNearestNodeOfType,
  mergeRegister,
} from "@lexical/utils"
import classNames from "classnames"
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  $isTextNode,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_NORMAL,
  FORMAT_TEXT_COMMAND,
  KEY_MODIFIER_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical"
import { getSelectedNode } from "../../helpers/getSelectedNode"
import { sanitizeUrl } from "../../helpers/url"
import { useModal } from "../../hooks/useModal"
import { IS_APPLE } from "../../shared/environment"
import { DropdownColorPicker } from "../../ui/DropDown/ColorPicker/ColorPicker"
import stylesIconDropdown from "../../ui/DropDown/IconDropdown/IconDropdown.module.scss"
import stylesIcon from "../../ui/Icon/Icon.module.scss"
import { ButtonBold } from "./ButtonBold/ButtonBold"
import { ButtonItalic } from "./ButtonItalic/ButtonItalic"
import { ButtonLink } from "./ButtonLink/ButtonLink"
import { ButtonUnderline } from "./ButtonUnderline/ButtonUnderline"
import { Divider } from "./Divider/Divider"
import { DropDownBlockFormat } from "./DropDownBlockFormat/DropDownBlockFormat"
import { DropDownTextAlignment } from "./DropDownTextAlignment/DropDownTextAlignment"
import { DropdownInsert } from "./DropdownInsert/DropdownInsert"
import { DropdownTextStyle } from "./DropdownTextStyle/DropdownTextStyle"
import { FontDropDown } from "./FontDropDown/FontDropDown"
import { IconButton } from "./IconButton/IconButton"
import { blockTypeToBlockName, rootTypeToRootName } from "./ToolbarPlugin.const"
import styles from "./ToolbarPlugin.module.scss"

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [blockType, setBlockType] = useState<keyof typeof blockTypeToBlockName>("paragraph")
  const [rootType, setRootType] = useState<keyof typeof rootTypeToRootName>("root")
  const [fontSize, setFontSize] = useState<string>("15px")
  const [fontColor, setFontColor] = useState<string>("#000")
  const [bgColor, setBgColor] = useState<string>("#fff")
  const [fontFamily, setFontFamily] = useState<string>("Arial")
  const [isLink, setIsLink] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isStrikethrough, setIsStrikethrough] = useState(false)
  const [isSubscript, setIsSubscript] = useState(false)
  const [isSuperscript, setIsSuperscript] = useState(false)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [modal, showModal] = useModal()
  const [isRTL, setIsRTL] = useState(false)
  const [isEditable, setIsEditable] = useState(() => editor.isEditable())

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode()
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent()

              return parent !== null && $isRootOrShadowRoot(parent)
            })

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow()
      }

      const elementKey = element.getKey()
      const elementDOM = activeEditor.getElementByKey(elementKey)

      // Update text format
      setIsBold(selection.hasFormat("bold"))
      setIsItalic(selection.hasFormat("italic"))
      setIsUnderline(selection.hasFormat("underline"))
      setIsStrikethrough(selection.hasFormat("strikethrough"))
      setIsSubscript(selection.hasFormat("subscript"))
      setIsSuperscript(selection.hasFormat("superscript"))
      setIsRTL($isParentElementRTL(selection))

      // Update links
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true)
      } else {
        setIsLink(false)
      }

      const tableNode = $findMatchingParent(node, $isTableNode)
      if ($isTableNode(tableNode)) {
        setRootType("table")
      } else {
        setRootType("root")
      }

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode)
          const type = parentList ? parentList.getListType() : element.getListType()
          setBlockType(type)
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType()
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName)
          }
        }
      }
      // Handle buttons
      setFontSize($getSelectionStyleValueForProperty(selection, "font-size", "15px"))
      setFontColor($getSelectionStyleValueForProperty(selection, "color", "#000"))
      setBgColor($getSelectionStyleValueForProperty(selection, "background-color", "#fff"))
      setFontFamily($getSelectionStyleValueForProperty(selection, "font-family", "Arial"))
    }
  }, [activeEditor])

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        $updateToolbar()
        setActiveEditor(newEditor)

        return false
      },
      COMMAND_PRIORITY_CRITICAL,
    )
  }, [editor, $updateToolbar])

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable)
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar()
        })
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload)

          return false
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload)

          return false
        },
        COMMAND_PRIORITY_CRITICAL,
      ),
    )
  }, [$updateToolbar, activeEditor, editor])

  useEffect(() => {
    return activeEditor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (payload) => {
        const event: KeyboardEvent = payload
        const { code, ctrlKey, metaKey } = event

        if (code === "KeyK" && (ctrlKey || metaKey)) {
          event.preventDefault()

          return activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl("https://"))
        }

        return false
      },
      COMMAND_PRIORITY_NORMAL,
    )
  }, [activeEditor, isLink])

  const applyStyleText = useCallback(
    (stylesText: Record<string, string>) => {
      activeEditor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, stylesText)
        }
      })
    },
    [activeEditor],
  )

  const clearFormatting = useCallback(() => {
    activeEditor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const anchor = selection.anchor
        const focus = selection.focus
        const nodes = selection.getNodes()

        if (anchor.key === focus.key && anchor.offset === focus.offset) {
          return
        }

        nodes.forEach((node, idx) => {
          // We split the first and last node by the selection
          // So that we don't format unselected text inside those nodes
          if ($isTextNode(node)) {
            if (idx === 0 && anchor.offset !== 0) {
              node = node.splitText(anchor.offset)[1] || node
            }
            if (idx === nodes.length - 1) {
              node = node.splitText(focus.offset)[0] || node
            }

            if (node.__style !== "") {
              node.setStyle("")
            }
            if (node.__format !== 0) {
              node.setFormat(0)
              $getNearestBlockElementAncestorOrThrow(node).setFormat("")
            }
          } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
            node.replace($createParagraphNode(), true)
          } else if ($isDecoratorBlockNode(node)) {
            node.setFormat("")
          }
        })
      }
    })
  }, [activeEditor])

  const onFontColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ color: value })
    },
    [applyStyleText],
  )

  const onBgColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ "background-color": value })
    },
    [applyStyleText],
  )

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl("https://"))
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
  }, [editor, isLink])

  return (
    <div className={styles.toolbar}>
      <button
        aria-label="Undo"
        className={classNames(styles.toolbarItem, styles.spaced)}
        disabled={!canUndo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(UNDO_COMMAND, undefined)
        }}
        title={IS_APPLE ? "Undo (⌘Z)" : "Undo (Ctrl+Z)"}
        type="button"
      >
        <IconButton disabled={!canUndo || !isEditable} type="undo" />
      </button>
      <button
        aria-label="Redo"
        className={classNames(styles.toolbarItem)}
        disabled={!canRedo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(REDO_COMMAND, undefined)
        }}
        title={IS_APPLE ? "Redo (⌘Y)" : "Redo (Ctrl+Y)"}
        type="button"
      >
        <IconButton disabled={!canRedo || !isEditable} type="redo" />
      </button>
      <Divider />
      {blockType in blockTypeToBlockName && activeEditor === editor && (
        <>
          <DropDownBlockFormat
            _rootType={rootType}
            blockType={blockType}
            disabled={!isEditable}
            editor={editor}
          />
          <Divider />
        </>
      )}
      <FontDropDown
        disabled={!isEditable}
        editor={editor}
        styleName="font-family"
        value={fontFamily}
      />
      <FontDropDown disabled={!isEditable} editor={editor} styleName="font-size" value={fontSize} />
      <Divider />
      <ButtonBold
        isActive={isBold}
        isEditable={isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
        }}
      />
      <ButtonItalic
        isActive={isItalic}
        isEditable={isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
        }}
      />
      <ButtonUnderline
        isActive={isUnderline}
        isEditable={isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
        }}
      />
      <ButtonLink isActive={isLink} isEditable={isEditable} onClick={insertLink} />
      <DropdownColorPicker
        buttonAriaLabel="Formatting text color"
        buttonClassName={styles.toolbarItem}
        buttonIconClassName={classNames(stylesIconDropdown.icon, stylesIcon["font-color"])}
        color={fontColor}
        disabled={!isEditable}
        onChange={onFontColorSelect}
        title="text color"
      />
      <DropdownColorPicker
        buttonAriaLabel="Formatting background color"
        buttonClassName={styles.toolbarItem}
        buttonIconClassName={classNames(stylesIconDropdown.icon, stylesIcon["bg-color"])}
        color={bgColor}
        disabled={!isEditable}
        onChange={onBgColorSelect}
        title="bg color"
      />
      <DropdownTextStyle
        activeEditor={activeEditor}
        clearFormatting={clearFormatting}
        isEditable={isEditable}
        isStrikethrough={isStrikethrough}
        isSubscript={isSubscript}
        isSuperscript={isSuperscript}
      />
      <Divider />
      <DropdownInsert activeEditor={activeEditor} isEditable={isEditable} showModal={showModal} />
      <Divider />
      <DropDownTextAlignment activeEditor={activeEditor} isEditable={isEditable} isRTL={isRTL} />

      {modal}
    </div>
  )
}
