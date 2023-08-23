/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useCallback, useEffect, useState } from "react"
import { $isCodeNode, CODE_LANGUAGE_MAP, getLanguageFriendlyName } from "@lexical/code"
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
  $getNodeByKey,
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
  NodeKey,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical"
import { getSelectedNode } from "../../helpers/getSelectedNode"
import { sanitizeUrl } from "../../helpers/url"
import { useModal } from "../../hooks/useModal"
import { IS_APPLE } from "../../shared/environment"
import { DropdownColorPicker } from "../../ui/DropDown/ColorPicker/ColorPicker"
import { DropDown } from "../../ui/DropDown/DropDown"
import stylesDropdown from "../../ui/DropDown/DropDown.module.scss"
import { DropDownItem } from "../../ui/DropDown/DropDownItem/DropDownItem"
import stylesIconDropdown from "../../ui/DropDown/IconDropdown/IconDropdown.module.scss"
import stylesIcon from "../../ui/Icon/Icon.module.scss"
import { ButtonBold } from "./ButtonBold/ButtonBold"
import { ButtonCode } from "./ButtonCode/ButtonCode"
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
import { dropDownActiveClass, getCodeLanguageOptions } from "./ToolbarPlugin.helpers"
import styles from "./ToolbarPlugin.module.scss"

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions()

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [blockType, setBlockType] = useState<keyof typeof blockTypeToBlockName>("paragraph")
  const [rootType, setRootType] = useState<keyof typeof rootTypeToRootName>("root")
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null)
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
  const [isCode, setIsCode] = useState(false)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [modal, showModal] = useModal()
  const [isRTL, setIsRTL] = useState(false)
  const [codeLanguage, setCodeLanguage] = useState<string>("")
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
      setIsCode(selection.hasFormat("code"))
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
        setSelectedElementKey(elementKey)
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode)
          const type = parentList ? parentList.getListType() : element.getListType()
          setBlockType(type)
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType()
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName)
          }
          if ($isCodeNode(element)) {
            const language = element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP
            setCodeLanguage(language ? CODE_LANGUAGE_MAP[language] || language : "")

            return
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

  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      activeEditor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey)
          if ($isCodeNode(node)) {
            node.setLanguage(value)
          }
        }
      })
    },
    [activeEditor, selectedElementKey],
  )

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
        <IconButton type="undo" />
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
        <IconButton type="redo" />
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
      {blockType === "code" ? (
        <DropDown
          buttonAriaLabel="Select language"
          buttonClassName={classNames(styles.toolbarItem, styles.codeLanguage)}
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
      ) : (
        <>
          <FontDropDown
            disabled={!isEditable}
            editor={editor}
            styleName={"font-family"}
            value={fontFamily}
          />
          <FontDropDown
            disabled={!isEditable}
            editor={editor}
            styleName={"font-size"}
            value={fontSize}
          />
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
          <ButtonCode
            isActive={isCode}
            isEditable={isEditable}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")
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
          {rootType === "table" && (
            <>
              <DropDown
                buttonAriaLabel="Open table toolkit"
                buttonClassName={classNames(styles.toolbarItem, styles.spaced)}
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
              <Divider />
            </>
          )}
          <DropdownInsert
            activeEditor={activeEditor}
            isEditable={isEditable}
            showModal={showModal}
          />
        </>
      )}
      <Divider />
      <DropDownTextAlignment activeEditor={activeEditor} isEditable={isEditable} isRTL={isRTL} />

      {modal}
    </div>
  )
}
