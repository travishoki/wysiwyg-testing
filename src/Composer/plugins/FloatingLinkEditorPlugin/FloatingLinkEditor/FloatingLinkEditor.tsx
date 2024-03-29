import React, { Dispatch, useCallback, useEffect, useRef, useState } from "react"
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link"
import { mergeRegister } from "@lexical/utils"
import classNames from "classnames"
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_HIGH,
  COMMAND_PRIORITY_LOW,
  GridSelection,
  KEY_ESCAPE_COMMAND,
  LexicalEditor,
  NodeSelection,
  RangeSelection,
  SELECTION_CHANGE_COMMAND,
} from "lexical"
import { useTranslation } from "src/i18n"
import { getSelectedNode } from "../../../helpers/getSelectedNode"
import { setFloatingElemPositionForLinkEditor } from "../../../helpers/setFloatingElemPositionForLinkEditor"
import { sanitizeUrl } from "../../../helpers/url"
import { ButtonCancel } from "./ButtonCancel/ButtonCancel"
import { ButtonConfirm } from "./ButtonConfirm/ButtonConfirm"
import { ButtonEdit } from "./ButtonEdit/ButtonEdit"
import { ButtonTrash } from "./ButtonTrash/ButtonTrash"
import styles from "./FloatingLinkEditor.module.scss"

type FloatingLinkEditorProps = {
  anchorElem: HTMLElement
  editor: LexicalEditor
  isLink: boolean
  setIsLink: Dispatch<boolean>
}

export const FloatingLinkEditor = ({
  anchorElem,
  editor,
  isLink,
  setIsLink,
}: FloatingLinkEditorProps) => {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [linkUrl, setLinkUrl] = useState("")
  const [editedLinkUrl, setEditedLinkUrl] = useState("")
  const [isEditMode, setEditMode] = useState(false)
  const [lastSelection, setLastSelection] = useState<
    RangeSelection | GridSelection | NodeSelection | null
  >(null)
  const { t } = useTranslation("scenes", { keyPrefix: "composer" })

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection)
      const parent = node.getParent()
      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL())
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL())
      } else {
        setLinkUrl("")
      }
    }
    const editorElem = editorRef.current
    const nativeSelection = window.getSelection()
    const activeElement = document.activeElement

    if (editorElem === null) {
      return
    }

    const rootElement = editor.getRootElement()

    if (
      selection !== null &&
      nativeSelection !== null &&
      rootElement !== null &&
      rootElement.contains(nativeSelection.anchorNode) &&
      editor.isEditable()
    ) {
      const domRect: DOMRect | undefined =
        nativeSelection.focusNode?.parentElement?.getBoundingClientRect()
      if (domRect) {
        domRect.y += 40
        setFloatingElemPositionForLinkEditor(domRect, editorElem, anchorElem)
      }
      setLastSelection(selection)
    } else if (!activeElement || activeElement.className !== "composer-link-input") {
      if (rootElement !== null) {
        setFloatingElemPositionForLinkEditor(null, editorElem, anchorElem)
      }
      setLastSelection(null)
      setEditMode(false)
      setLinkUrl("")
    }

    return true
  }, [anchorElem, editor])

  useEffect(() => {
    const scrollerElem = anchorElem.parentElement

    const update = () => {
      editor.getEditorState().read(() => {
        updateLinkEditor()
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
  }, [anchorElem.parentElement, editor, updateLinkEditor])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateLinkEditor()
        })
      }),

      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateLinkEditor()

          return true
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        KEY_ESCAPE_COMMAND,
        () => {
          if (isLink) {
            setIsLink(false)

            return true
          }

          return false
        },
        COMMAND_PRIORITY_HIGH,
      ),
    )
  }, [editor, updateLinkEditor, setIsLink, isLink])

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor()
    })
  }, [editor, updateLinkEditor])

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditMode])

  const monitorInputInteraction = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      handleLinkSubmission()
    } else if (event.key === "Escape") {
      event.preventDefault()
      setEditMode(false)
    }
  }

  const handleLinkSubmission = () => {
    if (lastSelection !== null) {
      if (linkUrl !== "") {
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl(editedLinkUrl))
      }
      setEditMode(false)
    }
  }

  return (
    <div className={styles.linkEditor} ref={editorRef}>
      {!isLink ? null : isEditMode ? (
        <>
          <input
            aria-label={t("Link input")}
            className={classNames("composer-link-input", styles.linkInput)}
            onChange={(event) => {
              setEditedLinkUrl(event.target.value)
            }}
            onKeyDown={(event) => {
              monitorInputInteraction(event)
            }}
            ref={inputRef}
            value={editedLinkUrl}
          />
          <div>
            <ButtonCancel
              onClick={() => {
                setEditMode(false)
              }}
            />
            <ButtonConfirm onClick={handleLinkSubmission} />
          </div>
        </>
      ) : (
        <div className={styles.linkView}>
          <a href={sanitizeUrl(linkUrl)} rel="noopener noreferrer" target="_blank">
            {linkUrl}
          </a>
          <ButtonEdit
            onClick={() => {
              setEditedLinkUrl(linkUrl)
              setEditMode(true)
            }}
          />
          <ButtonTrash onClick={() => editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)} />
        </div>
      )}
    </div>
  )
}
