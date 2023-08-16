import * as React from "react"
import { useCallback, useEffect, useRef } from "react"
import { TOGGLE_LINK_COMMAND } from "@lexical/link"
import { mergeRegister } from "@lexical/utils"
import {
  $getSelection,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  LexicalEditor,
  SELECTION_CHANGE_COMMAND,
} from "lexical"
import { getDOMRangeRect } from "../../utils/getDOMRangeRect"
import { setFloatingElemPosition } from "../../utils/setFloatingElemPosition"
import { INSERT_INLINE_IMAGE_COMMAND } from "../InlineImagePlugin/const"

type TextFormatFloatingToolbarProps = {
  editor: LexicalEditor
  anchorElem: HTMLElement
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
  editor,
  anchorElem,
  isLink,
  isBold,
  isItalic,
  isUnderline,
  isCode,
  isStrikethrough,
  isSubscript,
  isSuperscript,
}: TextFormatFloatingToolbarProps) => {
  const popupCharStylesEditorRef = useRef<HTMLDivElement | null>(null)

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, "https://")
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
    }
  }, [editor, isLink])

  const insertComment = () => {
    editor.dispatchCommand(INSERT_INLINE_IMAGE_COMMAND, undefined)
  }

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
    <div ref={popupCharStylesEditorRef} className="floating-text-format-popup">
      {editor.isEditable() && (
        <>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")
            }}
            className={"popup-item spaced " + (isBold ? "active" : "")}
            aria-label="Format text as bold"
          >
            <i className="format bold" />
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")
            }}
            className={"popup-item spaced " + (isItalic ? "active" : "")}
            aria-label="Format text as italics"
          >
            <i className="format italic" />
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
            }}
            className={"popup-item spaced " + (isUnderline ? "active" : "")}
            aria-label="Format text to underlined"
          >
            <i className="format underline" />
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
            }}
            className={"popup-item spaced " + (isStrikethrough ? "active" : "")}
            aria-label="Format text with a strikethrough"
          >
            <i className="format strikethrough" />
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")
            }}
            className={"popup-item spaced " + (isSubscript ? "active" : "")}
            title="Subscript"
            aria-label="Format Subscript"
          >
            <i className="format subscript" />
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")
            }}
            className={"popup-item spaced " + (isSuperscript ? "active" : "")}
            title="Superscript"
            aria-label="Format Superscript"
          >
            <i className="format superscript" />
          </button>
          <button
            type="button"
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")
            }}
            className={"popup-item spaced " + (isCode ? "active" : "")}
            aria-label="Insert code block"
          >
            <i className="format code" />
          </button>
          <button
            type="button"
            onClick={insertLink}
            className={"popup-item spaced " + (isLink ? "active" : "")}
            aria-label="Insert link"
          >
            <i className="format link" />
          </button>
        </>
      )}
      <button
        type="button"
        onClick={insertComment}
        className={"popup-item spaced insert-comment"}
        aria-label="Insert comment"
      >
        <i className="format add-comment" />
      </button>
    </div>
  )
}
