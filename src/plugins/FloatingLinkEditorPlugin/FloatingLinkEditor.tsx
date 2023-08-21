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
import { getSelectedNode } from "../../utils/getSelectedNode"
import { setFloatingElemPositionForLinkEditor } from "../../utils/setFloatingElemPositionForLinkEditor"
import { sanitizeUrl } from "../../utils/url"
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
            aria-label="input"
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
            <div
              aria-label="cancel"
              className={styles.linkCancel}
              onClick={() => {
                setEditMode(false)
              }}
              onMouseDown={(event) => event.preventDefault()}
              role="button"
              tabIndex={0}
            />

            <div
              aria-label="confim"
              className={styles.linkConfirm}
              onClick={handleLinkSubmission}
              onMouseDown={(event) => event.preventDefault()}
              role="button"
              tabIndex={0}
            />
          </div>
        </>
      ) : (
        <div className={styles.linkView}>
          <a href={sanitizeUrl(linkUrl)} rel="noopener noreferrer" target="_blank">
            {linkUrl}
          </a>
          <div
            aria-label="edit"
            className={styles.linkEdit}
            onClick={() => {
              setEditedLinkUrl(linkUrl)
              setEditMode(true)
            }}
            onMouseDown={(event) => event.preventDefault()}
            role="button"
            tabIndex={0}
          />
          <div
            aria-label="trash"
            className={styles.linkTrash}
            onClick={() => {
              editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
            }}
            onMouseDown={(event) => event.preventDefault()}
            role="button"
            tabIndex={0}
          />
        </div>
      )}
    </div>
  )
}
