/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react"
import { useCallback, useEffect, useState } from "react"
import { $isCodeNode, CODE_LANGUAGE_MAP, getLanguageFriendlyName } from "@lexical/code"
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link"
import { $isListNode, ListNode } from "@lexical/list"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $isDecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode"
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode"
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
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  KEY_MODIFIER_COMMAND,
  NodeKey,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical"
import { useModal } from "../../hooks/useModal"
import { IS_APPLE } from "../../shared/environment"
import { DropdownColorPicker } from "../../ui/DropDown/ColorPicker"
import { DropDown } from "../../ui/DropDown/DropDown"
import { DropDownItem } from "../../ui/DropDown/DropDownItem"
import { getSelectedNode } from "../../utils/getSelectedNode"
import { sanitizeUrl } from "../../utils/url"
import { InsertImageDialog } from "../ImagesPlugin/InsertImageDialog"
import { InsertInlineImageDialog } from "../InlineImagePlugin/InsertInlineImageDialog"
import { InsertNewTableDialog } from "../TablePlugin/InsertNewTableDialog"
import { InsertTableDialog } from "../TablePlugin/InsertTableDialog"
import { BlockFormatDropDown } from "./BlockFormatDropDown"
import { Divider } from "./Divider"
import { FontDropDown } from "./FontDropDown"
import { blockTypeToBlockName, rootTypeToRootName } from "./const"
import { dropDownActiveClass, getCodeLanguageOptions } from "./helpers"

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
    (styles: Record<string, string>) => {
      activeEditor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, styles)
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
    <div className="toolbar">
      <button
        aria-label="Undo"
        className="toolbar-item spaced"
        disabled={!canUndo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(UNDO_COMMAND, undefined)
        }}
        title={IS_APPLE ? "Undo (⌘Z)" : "Undo (Ctrl+Z)"}
        type="button"
      >
        <i className="format undo" />
      </button>
      <button
        aria-label="Redo"
        className="toolbar-item"
        disabled={!canRedo || !isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(REDO_COMMAND, undefined)
        }}
        title={IS_APPLE ? "Redo (⌘Y)" : "Redo (Ctrl+Y)"}
        type="button"
      >
        <i className="format redo" />
      </button>
      <Divider />
      {blockType in blockTypeToBlockName && activeEditor === editor && (
        <>
          <BlockFormatDropDown
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
          buttonClassName="toolbar-item code-language"
          buttonLabel={getLanguageFriendlyName(codeLanguage)}
          disabled={!isEditable}
        >
          {CODE_LANGUAGE_OPTIONS.map(([value, name]) => {
            return (
              <DropDownItem
                className={`item ${dropDownActiveClass(value === codeLanguage)}`}
                key={value}
                onClick={() => onCodeLanguageSelect(value)}
              >
                <span className="text">{name}</span>
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
          <button
            aria-label={`Format text as bold. Shortcut: ${IS_APPLE ? "⌘B" : "Ctrl+B"}`}
            className={"toolbar-item spaced " + (isBold ? "active" : "")}
            disabled={!isEditable}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
            }}
            title={IS_APPLE ? "Bold (⌘B)" : "Bold (Ctrl+B)"}
            type="button"
          >
            <i className="format bold" />
          </button>
          <button
            aria-label={`Format text as italics. Shortcut: ${IS_APPLE ? "⌘I" : "Ctrl+I"}`}
            className={"toolbar-item spaced " + (isItalic ? "active" : "")}
            disabled={!isEditable}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
            }}
            title={IS_APPLE ? "Italic (⌘I)" : "Italic (Ctrl+I)"}
            type="button"
          >
            <i className="format italic" />
          </button>
          <button
            aria-label={`Format text to underlined. Shortcut: ${IS_APPLE ? "⌘U" : "Ctrl+U"}`}
            className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
            disabled={!isEditable}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
            }}
            title={IS_APPLE ? "Underline (⌘U)" : "Underline (Ctrl+U)"}
            type="button"
          >
            <i className="format underline" />
          </button>
          <button
            aria-label="Insert code block"
            className={"toolbar-item spaced " + (isCode ? "active" : "")}
            disabled={!isEditable}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")
            }}
            title="Insert code block"
            type="button"
          >
            <i className="format code" />
          </button>
          <button
            aria-label="Insert link"
            className={"toolbar-item spaced " + (isLink ? "active" : "")}
            disabled={!isEditable}
            onClick={insertLink}
            title="Insert link"
            type="button"
          >
            <i className="format link" />
          </button>
          <DropdownColorPicker
            buttonAriaLabel="Formatting text color"
            buttonClassName="toolbar-item color-picker"
            buttonIconClassName="icon font-color"
            color={fontColor}
            disabled={!isEditable}
            onChange={onFontColorSelect}
            title="text color"
          />
          <DropdownColorPicker
            buttonAriaLabel="Formatting background color"
            buttonClassName="toolbar-item color-picker"
            buttonIconClassName="icon bg-color"
            color={bgColor}
            disabled={!isEditable}
            onChange={onBgColorSelect}
            title="bg color"
          />
          <DropDown
            buttonAriaLabel="Formatting options for additional text styles"
            buttonClassName="toolbar-item spaced"
            buttonIconClassName="icon dropdown-more"
            buttonLabel=""
            disabled={!isEditable}
          >
            <DropDownItem
              aria-label="Format text with a strikethrough"
              className={"item " + dropDownActiveClass(isStrikethrough)}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
              }}
              title="Strikethrough"
            >
              <i className="icon strikethrough" />
              <span className="text">Strikethrough</span>
            </DropDownItem>
            <DropDownItem
              aria-label="Format text with a subscript"
              className={"item " + dropDownActiveClass(isSubscript)}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")
              }}
              title="Subscript"
            >
              <i className="icon subscript" />
              <span className="text">Subscript</span>
            </DropDownItem>
            <DropDownItem
              aria-label="Format text with a superscript"
              className={"item " + dropDownActiveClass(isSuperscript)}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")
              }}
              title="Superscript"
            >
              <i className="icon superscript" />
              <span className="text">Superscript</span>
            </DropDownItem>
            <DropDownItem
              aria-label="Clear all text formatting"
              className="item"
              onClick={clearFormatting}
              title="Clear text formatting"
            >
              <i className="icon clear" />
              <span className="text">Clear Formatting</span>
            </DropDownItem>
          </DropDown>
          <Divider />
          {rootType === "table" && (
            <>
              <DropDown
                buttonAriaLabel="Open table toolkit"
                buttonClassName="toolbar-item spaced"
                buttonIconClassName="icon table secondary"
                buttonLabel="Table"
                disabled={!isEditable}
              >
                <DropDownItem
                  className="item"
                  onClick={() => {
                    /**/
                  }}
                >
                  <span className="text">TODO</span>
                </DropDownItem>
              </DropDown>
              <Divider />
            </>
          )}
          <DropDown
            buttonAriaLabel="Insert specialized editor node"
            buttonClassName="toolbar-item spaced"
            buttonIconClassName="icon plus"
            buttonLabel="Insert"
            disabled={!isEditable}
          >
            <DropDownItem
              className="item"
              onClick={() => {
                activeEditor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined)
              }}
            >
              <i className="icon horizontal-rule" />
              <span className="text">Horizontal Rule</span>
            </DropDownItem>
            <DropDownItem
              className="item"
              onClick={() => {
                showModal("Insert Image", (onClose) => (
                  <InsertImageDialog activeEditor={activeEditor} onClose={onClose} />
                ))
              }}
            >
              <i className="icon image" />
              <span className="text">Image</span>
            </DropDownItem>
            <DropDownItem
              className="item"
              onClick={() => {
                showModal("Insert Inline Image", (onClose) => (
                  <InsertInlineImageDialog activeEditor={activeEditor} onClose={onClose} />
                ))
              }}
            >
              <i className="icon image" />
              <span className="text">Inline Image</span>
            </DropDownItem>
            <DropDownItem
              className="item"
              onClick={() => {
                showModal("Insert Table", (onClose) => (
                  <InsertTableDialog activeEditor={activeEditor} onClose={onClose} />
                ))
              }}
            >
              <i className="icon table" />
              <span className="text">Table</span>
            </DropDownItem>
            <DropDownItem
              className="item"
              onClick={() => {
                showModal("Insert Table", (onClose) => (
                  <InsertNewTableDialog activeEditor={activeEditor} onClose={onClose} />
                ))
              }}
            >
              <i className="icon table" />
              <span className="text">Table (Experimental)</span>
            </DropDownItem>
          </DropDown>
        </>
      )}
      <Divider />
      <DropDown
        buttonAriaLabel="Formatting options for text alignment"
        buttonClassName="toolbar-item spaced alignment"
        buttonIconClassName="icon left-align"
        buttonLabel="Align"
        disabled={!isEditable}
      >
        <DropDownItem
          className="item"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")
          }}
        >
          <i className="icon left-align" />
          <span className="text">Left Align</span>
        </DropDownItem>
        <DropDownItem
          className="item"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")
          }}
        >
          <i className="icon center-align" />
          <span className="text">Center Align</span>
        </DropDownItem>
        <DropDownItem
          className="item"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")
          }}
        >
          <i className="icon right-align" />
          <span className="text">Right Align</span>
        </DropDownItem>
        <DropDownItem
          className="item"
          onClick={() => {
            activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
          }}
        >
          <i className="icon justify-align" />
          <span className="text">Justify Align</span>
        </DropDownItem>
        <Divider />
        <DropDownItem
          className="item"
          onClick={() => {
            activeEditor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)
          }}
        >
          <i className={"icon " + (isRTL ? "indent" : "outdent")} />
          <span className="text">Outdent</span>
        </DropDownItem>
        <DropDownItem
          className="item"
          onClick={() => {
            activeEditor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)
          }}
        >
          <i className={"icon " + (isRTL ? "outdent" : "indent")} />
          <span className="text">Indent</span>
        </DropDownItem>
      </DropDown>

      {modal}
    </div>
  )
}
