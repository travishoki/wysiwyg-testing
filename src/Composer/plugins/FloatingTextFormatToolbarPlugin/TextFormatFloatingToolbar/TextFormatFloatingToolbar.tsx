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
  TextFormatType,
} from "lexical"
import { useTranslation } from "src/i18n"
import { getDOMRangeRect } from "../../../helpers/getDOMRangeRect"
import { setFloatingElemPosition } from "../../../helpers/setFloatingElemPosition"
import { IconButton } from "../../ToolbarPlugin/IconButton/IconButton"
import styles from "./TextFormatFloatingToolbar.module.scss"

type TextFormatFloatingToolbarProps = {
  anchorElem: HTMLElement
  editor: LexicalEditor
  isBold: boolean
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
  isItalic,
  isLink,
  isStrikethrough,
  isSubscript,
  isSuperscript,
  isUnderline,
}: TextFormatFloatingToolbarProps) => {
  const popupCharStylesEditorRef = useRef<HTMLDivElement | null>(null)

  const { t } = useTranslation("scenes", { keyPrefix: "composer" })

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

  const formatText = (format: TextFormatType) => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)
  }

  return (
    <div className={styles.floatingTextFormatPopup} ref={popupCharStylesEditorRef}>
      {editor.isEditable() && (
        <>
          <button
            aria-label={t("Format text as bold.")}
            className={classNames(styles.popupItem, styles.spaced + (isBold ? styles.active : ""))}
            onClick={() => {
              formatText("bold")
            }}
            type="button"
          >
            <IconButton type="bold" />
          </button>
          <button
            aria-label={t("Format text as italics.")}
            className={classNames(
              styles.popupItem,
              styles.spaced + (isItalic ? styles.active : ""),
            )}
            onClick={() => {
              formatText("italic")
            }}
            type="button"
          >
            <IconButton type="italic" />
          </button>
          <button
            aria-label={t("Format text to underlined.")}
            className={classNames(
              styles.popupItem,
              styles.spaced + (isUnderline ? styles.active : ""),
            )}
            onClick={() => {
              formatText("underline")
            }}
            type="button"
          >
            <IconButton type="underline" />
          </button>
          <button
            aria-label={t("Format text with a strikethrough")}
            className={classNames(
              styles.popupItem,
              styles.spaced + (isStrikethrough ? styles.active : ""),
            )}
            onClick={() => {
              formatText("strikethrough")
            }}
            type="button"
          >
            <IconButton type="strikethrough" />
          </button>
          <button
            aria-label={t("Format subscript")}
            className={classNames(
              styles.popupItem,
              styles.spaced + (isSubscript ? styles.active : ""),
            )}
            onClick={() => {
              formatText("subscript")
            }}
            title={t("Subscript")}
            type="button"
          >
            <IconButton type="subscript" />
          </button>
          <button
            aria-label={t("Format superscript")}
            className={classNames(
              styles.popupItem,
              styles.spaced + (isSuperscript ? styles.active : ""),
            )}
            onClick={() => {
              formatText("superscript")
            }}
            title={t("Superscript")}
            type="button"
          >
            <IconButton type="superscript" />
          </button>
          <button
            aria-label={t("Insert link")}
            className={classNames(styles.popupItem, styles.spaced + (isLink ? styles.active : ""))}
            onClick={insertLink}
            type="button"
          >
            <IconButton type="link" />
          </button>
        </>
      )}
    </div>
  )
}
