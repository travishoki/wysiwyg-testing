import React, { useCallback, useEffect, useRef } from "react"
import { TOGGLE_LINK_COMMAND } from "@lexical/link"
import { mergeRegister } from "@lexical/utils"
import classNames from "classnames"
import {
  $getSelection,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "lexical"
import { IconToolbarButton } from "../../../Icon/IconToolbarButton/IconToolbarButton"
import { getDOMRangeRect } from "../../../helpers/getDOMRangeRect"
import { setFloatingElemPosition } from "../../../helpers/setFloatingElemPosition"
import styles from "./TextFormatFloatingToolbar.module.scss"

type TextFormatFloatingToolbarProps = {
  anchorElem: HTMLElement
  editor: LexicalEditor
  isBold: boolean
  isCode: boolean
  isItalic: boolean
  isLink: boolean
  isStrikethrough: boolean
  isSubscript: boolean
  isSuperscript: boolean
  isUnderline: boolean
}

export const TextFormatFloatingToolbar = ({
  anchorElem,
  editor,
  isBold,
  isCode,
  isItalic,
  isLink,
  isStrikethrough,
  isSubscript,
  isSuperscript,
  isUnderline,
}: TextFormatFloatingToolbarProps) => {
  const popupCharStylesEditorRef = useRef<HTMLDivElement | null>(null)

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://")
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
  }, [editor, isLink])

  const mouseMoveListener = (e: MouseEvent) => {
    if (popupCharStylesEditorRef?.current && (e.buttons === 1 || e.buttons === 3)) {
      if (popupCharStylesEditorRef.current.style.pointerEvents !== "none") {
        const x = e.clientX
        const y = e.clientY
        const elementUnderMouse = document.elementFromPoint(x, y)

        if (!popupCharStylesEditorRef.current.contains(elementUnderMouse)) {
          // Mouse is not over the target element => not a normal click, but probably a drag
          popupCharStylesEditorRef.current.style.pointerEvents = "none"
        }
      }
    }
  }

  const mouseUpListener = (_e: MouseEvent) => {
    if (popupCharStylesEditorRef?.current) {
      if (popupCharStylesEditorRef.current.style.pointerEvents !== "auto") {
        popupCharStylesEditorRef.current.style.pointerEvents = "auto"
      }
    }
  }

  useEffect(() => {
    if (popupCharStylesEditorRef?.current) {
      document.addEventListener("mousemove", mouseMoveListener)
      document.addEventListener("mouseup", mouseUpListener)

      return () => {
        document.removeEventListener("mousemove", mouseMoveListener)
        document.removeEventListener("mouseup", mouseUpListener)
      }
    }
  }, [popupCharStylesEditorRef])

  const updateTextFormatFloatingToolbar = useCallback(() => {
    const selection = $getSelection()

    const popupCharStylesEditorElem = popupCharStylesEditorRef.current
    const nativeSelection = window.getSelection()

    if (popupCharStylesEditorElem === null) {
      return
    }

    const rootElement = editor.getRootElement()
    if (
      selection !== null &&
      nativeSelection !== null &&
      !nativeSelection.isCollapsed &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode)
    ) {
      const rangeRect = getDOMRangeRect(nativeSelection, rootElement)

      setFloatingElemPosition(rangeRect, popupCharStylesEditorElem, anchorElem)
    }
  }, [editor, anchorElem])

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement

    const update = () => {
      editor.getEditorState().read(() => {
        updateTextFormatFloatingToolbar()
      })
    }

    window.addEventListener("resize", update)
    if (scrollerElem) {
      scrollerElem.addEventListener("scroll", update)
    }

    return () => {
      window.removeEventListener("resize", update)
      if (scrollerElem) {
        scrollerElem.removeEventListener("scroll", update)
      }
    }
  }, [editor, updateTextFormatFloatingToolbar, anchorElem])

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateTextFormatFloatingToolbar()
    })

    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateTextFormatFloatingToolbar()
        })
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateTextFormatFloatingToolbar()

          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
    )
  }, [editor, updateTextFormatFloatingToolbar])

  return (
    <div className={styles.floatingTextFormatPopup} ref={popupCharStylesEditorRef}>
      {editor.isEditable() && (
        <>
          <button
            aria-label="Format text as bold"
            className={classNames(styles.popupItem, styles.spaced + (isBold ? styles.active : ""))}
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
            }}
            type="button"
          >
            <IconToolbarButton type="bold" />
          </button>
          <button
            aria-label="Format text as italics"
            className={classNames(
              styles.popupItem,
              styles.spaced + (isItalic ? styles.active : ""),
            )}
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
            }}
            type="button"
          >
            <IconToolbarButton type="italic" />
          </button>
          <button
            aria-label="Format text to underlined"
            className={classNames(
              styles.popupItem,
              styles.spaced + (isUnderline ? styles.active : ""),
            )}
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
            }}
            type="button"
          >
            <IconToolbarButton type="underline" />
          </button>
          <button
            aria-label="Format text with a strikethrough"
            className={classNames(
              styles.popupItem,
              styles.spaced + (isStrikethrough ? styles.active : ""),
            )}
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
            }}
            type="button"
          >
            <IconToolbarButton type="strikethrough" />
          </button>
          <button
            aria-label="Format Subscript"
            className={classNames(
              styles.popupItem,
              styles.spaced + (isSubscript ? styles.active : ""),
            )}
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")
            }}
            title="Subscript"
            type="button"
          >
            <IconToolbarButton type="subscript" />
          </button>
          <button
            aria-label="Format Superscript"
            className={classNames(
              styles.popupItem,
              styles.spaced + (isSuperscript ? styles.active : ""),
            )}
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")
            }}
            title="Superscript"
            type="button"
          >
            <IconToolbarButton type="superscript" />
          </button>
          <button
            aria-label="Insert code block"
            className={classNames(styles.popupItem, styles.spaced + (isCode ? styles.active : ""))}
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")
            }}
            type="button"
          >
            <IconToolbarButton type="code" />
          </button>
          <button
            aria-label="Insert link"
            className={classNames(styles.popupItem, styles.spaced + (isLink ? styles.active : ""))}
            onClick={insertLink}
            type="button"
          >
            <IconToolbarButton type="link" />
          </button>
        </>
      )}
    </div>
  )
}
