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
import {
  $createHeadingNode,
  $isHeadingNode,
  $isQuoteNode,
  HeadingTagType,
} from "@lexical/rich-text"
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
  $setBlocksType,
} from "@lexical/selection"
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
  COMMAND_PRIORITY_LOW,
  COMMAND_PRIORITY_NORMAL,
  DEPRECATED_$isGridSelection as $isGridSelection,
  FORMAT_TEXT_COMMAND,
  KEY_MODIFIER_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  TextFormatType,
  UNDO_COMMAND,
} from "lexical"
import { useTranslation } from "src/i18n"
import { getSelectedNode } from "../../helpers/getSelectedNode"
import { sanitizeUrl } from "../../helpers/url"
import { useModal } from "../../hooks/useModal"
import { $isMergeFieldNode } from "../../nodes/MergeField/MergeFieldNode"
import { DropdownColorPicker } from "../../ui/DropDown/ColorPicker/ColorPicker"
import stylesIconDropdown from "../../ui/DropDown/IconDropdown/IconDropdown.module.scss"
import stylesIcon from "../../ui/Icon/Icon.module.scss"
import { ButtonBold } from "./ButtonBold/ButtonBold"
import { ButtonItalic } from "./ButtonItalic/ButtonItalic"
import { ButtonLink } from "./ButtonLink/ButtonLink"
import { ButtonRedo } from "./ButtonRedo/ButtonRedo"
import { ButtonUnderline } from "./ButtonUnderline/ButtonUnderline"
import { ButtonUndo } from "./ButtonUndo/ButtonUndo"
import { Divider } from "./Divider/Divider"
import { DropDownBlockFormat } from "./DropDownBlockFormat/DropDownBlockFormat"
import { DropDownTextAlignment } from "./DropDownTextAlignment/DropDownTextAlignment"
import { DropdownInsert } from "./DropdownInsert/DropdownInsert"
import { DropdownTextStyle } from "./DropdownTextStyle/DropdownTextStyle"
import { FontDropDown } from "./FontDropDown/FontDropDown"
import { FontSize } from "./FontSize/FontSize"
import {
  TOOLBAR_FORMAT_HEADING_COMMAND,
  TOOLBAR_FORMAT_PARAGRAPH_COMMAND,
  blockTypeToBlockName,
} from "./ToolbarPlugin.const"
import { getIsPureBlockType } from "./ToolbarPlugin.helpers"
import styles from "./ToolbarPlugin.module.scss"

export const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const [activeEditor, setActiveEditor] = useState(editor)
  const [blockType, setBlockType] = useState<keyof typeof blockTypeToBlockName>("paragraph")
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

  const { t } = useTranslation("scenes", { keyPrefix: "composer" })

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

      if (elementDOM !== null) {
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode)
          const type = parentList ? parentList.getListType() : element.getListType()
          setBlockType(type)
        } else if (!getIsPureBlockType(selection)) {
          setBlockType("custom")
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

        // Style MergeFields
        selection?.getNodes().forEach((node) => {
          if ($isMergeFieldNode(node)) {
            Object.entries(stylesText).forEach(([key, value]) => {
              node.setStyleValue(key, value)
            })
          }
        })

        // Style TextNode
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

        nodes.forEach((node, idx: number) => {
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
          } else if ($isMergeFieldNode(node)) {
            if (node.__style !== "") {
              node.setStyle("")
            }
            if (node.__format !== 0) {
              node.setFormat(0)
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

  const updateFontSize = useCallback(
    (option: string) => {
      editor.update(() => {
        const selection = $getSelection()

        // Style MergeFields
        selection?.getNodes().forEach((node) => {
          if ($isMergeFieldNode(node)) {
            node.setStyleValue("font-size", option)
          }
        })

        // Style TextNode
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            "font-size": option,
          })
        }
      })
    },
    [editor],
  )

  const styleText = useCallback(
    (format: TextFormatType) => {
      activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, format)
    },
    [activeEditor],
  )

  const resetFontStyling = useCallback(() => {
    if (isBold) styleText("bold")
    if (isItalic) styleText("italic")
    if (isUnderline) styleText("underline")
  }, [isUnderline, isItalic, isBold, styleText])

  const formatParagraph = useCallback(() => {
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
  }, [editor])

  const onHandleStyleChange = (format: TextFormatType) => {
    formatParagraph()
    styleText(format)
  }

  const formatHeading = useCallback(
    (headingSize: HeadingTagType) => {
      // Set font size
      switch (headingSize) {
        case "h1":
          updateFontSize("24px")
          break
        case "h2":
          updateFontSize("15px")
          break
        case "h3":
          updateFontSize("13px")
          break
        default:
      }

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
    },
    [blockType, editor, updateFontSize],
  )

  useEffect(() => {
    const unregister = mergeRegister(
      editor.registerCommand(
        TOOLBAR_FORMAT_PARAGRAPH_COMMAND,
        () => {
          resetFontStyling()
          formatParagraph()

          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        TOOLBAR_FORMAT_HEADING_COMMAND,
        (headingSize) => {
          resetFontStyling()
          formatHeading(headingSize)

          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
    )

    return () => {
      unregister()
    }
  }, [editor, formatHeading, formatParagraph, resetFontStyling, updateFontSize])

  return (
    <div className={styles.toolbar}>
      <ButtonUndo
        canUndo={canUndo}
        isEditable={isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(UNDO_COMMAND, undefined)
        }}
      />
      <ButtonRedo
        canRedo={canRedo}
        isEditable={isEditable}
        onClick={() => {
          activeEditor.dispatchCommand(REDO_COMMAND, undefined)
        }}
      />
      <Divider />
      {blockType in blockTypeToBlockName && activeEditor === editor && (
        <>
          <DropDownBlockFormat blockType={blockType} disabled={!isEditable} editor={editor} />
          <Divider />
        </>
      )}
      <FontDropDown
        disabled={!isEditable}
        editor={editor}
        styleName="font-family"
        value={fontFamily}
      />
      <FontSize disabled={!isEditable} editor={editor} selectionFontSize={fontSize.slice(0, -2)} />
      <Divider />
      <ButtonBold
        isActive={isBold}
        isEditable={isEditable}
        onClick={() => {
          onHandleStyleChange("bold")
        }}
      />
      <ButtonItalic
        isActive={isItalic}
        isEditable={isEditable}
        onClick={() => {
          onHandleStyleChange("italic")
        }}
      />
      <ButtonUnderline
        isActive={isUnderline}
        isEditable={isEditable}
        onClick={() => {
          onHandleStyleChange("underline")
        }}
      />
      <ButtonLink isActive={isLink} isEditable={isEditable} onClick={insertLink} />
      <DropdownColorPicker
        buttonAriaLabel={t("Formatting text color")}
        buttonClassName={styles.toolbarItem}
        buttonIconClassName={classNames(stylesIconDropdown.icon, stylesIcon["font-color"])}
        color={fontColor}
        disabled={!isEditable}
        onChange={onFontColorSelect}
        title={t("Text Color")}
      />
      <DropdownColorPicker
        buttonAriaLabel={t("Formatting background color")}
        buttonClassName={styles.toolbarItem}
        buttonIconClassName={classNames(stylesIconDropdown.icon, stylesIcon["bg-color"])}
        color={bgColor}
        disabled={!isEditable}
        onChange={onBgColorSelect}
        title={t("Background Color")}
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
