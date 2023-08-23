/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Suspense, useCallback, useEffect, useRef, useState } from "react"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary"
import { HashtagPlugin } from "@lexical/react/LexicalHashtagPlugin"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { LexicalNestedComposer } from "@lexical/react/LexicalNestedComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { useLexicalNodeSelection } from "@lexical/react/useLexicalNodeSelection"
import { mergeRegister } from "@lexical/utils"
import {
  $getNodeByKey,
  $getSelection,
  $isNodeSelection,
  $setSelection,
  CLICK_COMMAND,
  COMMAND_PRIORITY_LOW,
  DRAGSTART_COMMAND,
  GridSelection,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  KEY_ENTER_COMMAND,
  KEY_ESCAPE_COMMAND,
  LexicalEditor,
  NodeKey,
  NodeSelection,
  RangeSelection,
  SELECTION_CHANGE_COMMAND,
} from "lexical"
import { useSharedHistoryContext } from "../../../context/SharedHistoryContext"
import { EmojisPlugin } from "../../../plugins/EmojisPlugin/EmojisPlugin"
import { KeywordsPlugin } from "../../../plugins/KeywordsPlugin/KeywordsPlugin"
import { LinkPlugin } from "../../../plugins/LinkPlugin/LinkPlugin"
import { MentionsPlugin } from "../../../plugins/MentionsPlugin/MentionsPlugin"
import { ComposerNodeFallback } from "../../../ui/ComposerNodeFallback/ComposerNodeFallback"
import { ContentEditable } from "../../../ui/ContentEditable/ContentEditable"
import { ImageResizer } from "../../../ui/ImageResizer/ImageResizer"
import { Placeholder } from "../../../ui/Placeholder/Placeholder"
import { $isImageNode } from "../ImageNode"
import { LazyImage } from "../LazyImage/LazyImage"
import styles from "./ImageComponent.module.scss"

type ImageComponentProps = {
  altText: string
  caption: LexicalEditor
  captionsEnabled: boolean
  height: "inherit" | number
  maxWidth: number
  nodeKey: NodeKey
  resizable: boolean
  showCaption: boolean
  src: string
  width: "inherit" | number
}

const ImageComponent = ({
  altText,
  caption,
  captionsEnabled,
  height,
  maxWidth,
  nodeKey,
  resizable,
  showCaption,
  src,
  width,
}: ImageComponentProps) => {
  const imageRef = useRef<null | HTMLImageElement>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey)
  const [isResizing, setIsResizing] = useState<boolean>(false)
  const [editor] = useLexicalComposerContext()
  const [selection, setSelection] = useState<RangeSelection | NodeSelection | GridSelection | null>(
    null,
  )
  const activeEditorRef = useRef<LexicalEditor | null>(null)

  const onDelete = useCallback(
    (payload: KeyboardEvent) => {
      if (isSelected && $isNodeSelection($getSelection())) {
        const event: KeyboardEvent = payload
        event.preventDefault()
        const node = $getNodeByKey(nodeKey)
        if ($isImageNode(node)) {
          node.remove()
        }
      }

      return false
    },
    [isSelected, nodeKey],
  )

  const onEnter = useCallback(
    (event: KeyboardEvent) => {
      const latestSelection = $getSelection()
      const buttonElem = buttonRef.current
      if (
        isSelected &&
        $isNodeSelection(latestSelection) &&
        latestSelection.getNodes().length === 1
      ) {
        if (showCaption) {
          // Move focus into nested editor
          $setSelection(null)
          event.preventDefault()
          caption.focus()

          return true
        } else if (buttonElem !== null && buttonElem !== document.activeElement) {
          event.preventDefault()
          buttonElem.focus()

          return true
        }
      }

      return false
    },
    [caption, isSelected, showCaption],
  )

  const onEscape = useCallback(
    (event: KeyboardEvent) => {
      if (activeEditorRef.current === caption || buttonRef.current === event.target) {
        $setSelection(null)
        editor.update(() => {
          setSelected(true)
          const parentRootElement = editor.getRootElement()
          if (parentRootElement !== null) {
            parentRootElement.focus()
          }
        })

        return true
      }

      return false
    },
    [caption, editor, setSelected],
  )

  useEffect(() => {
    let isMounted = true
    const unregister = mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        if (isMounted) {
          setSelection(editorState.read(() => $getSelection()))
        }
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_, activeEditor) => {
          activeEditorRef.current = activeEditor

          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand<MouseEvent>(
        CLICK_COMMAND,
        (payload) => {
          const event = payload

          if (isResizing) {
            return true
          }
          if (event.target === imageRef.current) {
            if (event.shiftKey) {
              setSelected(!isSelected)
            } else {
              clearSelection()
              setSelected(true)
            }

            return true
          }

          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        DRAGSTART_COMMAND,
        (event) => {
          if (event.target === imageRef.current) {
            // TODO This is just a temporary workaround for FF to behave like other browsers.
            // Ideally, this handles drag & drop too (and all browsers).
            event.preventDefault()

            return true
          }

          return false
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(KEY_DELETE_COMMAND, onDelete, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_BACKSPACE_COMMAND, onDelete, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ENTER_COMMAND, onEnter, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ESCAPE_COMMAND, onEscape, COMMAND_PRIORITY_LOW),
    )

    return () => {
      isMounted = false
      unregister()
    }
  }, [
    clearSelection,
    editor,
    isResizing,
    isSelected,
    nodeKey,
    onDelete,
    onEnter,
    onEscape,
    setSelected,
  ])

  const setShowCaption = () => {
    editor.update(() => {
      const node = $getNodeByKey(nodeKey)
      if ($isImageNode(node)) {
        node.setShowCaption(true)
      }
    })
  }

  const onResizeEnd = (nextWidth: "inherit" | number, nextHeight: "inherit" | number) => {
    // Delay hiding the resize bars for click case
    setTimeout(() => {
      setIsResizing(false)
    }, 200)

    editor.update(() => {
      const node = $getNodeByKey(nodeKey)
      if ($isImageNode(node)) {
        node.setWidthAndHeight(nextWidth, nextHeight)
      }
    })
  }

  const onResizeStart = () => {
    setIsResizing(true)
  }

  const { historyState } = useSharedHistoryContext()

  const draggable = isSelected && $isNodeSelection(selection) && !isResizing
  const isFocused = isSelected || isResizing

  return (
    <Suspense fallback={<ComposerNodeFallback />}>
      <>
        <div draggable={draggable}>
          <LazyImage
            altText={altText}
            className={
              isFocused ? `focused ${$isNodeSelection(selection) ? "draggable" : ""}` : null
            }
            height={height}
            imageRef={imageRef}
            maxWidth={maxWidth}
            src={src}
            width={width}
          />
        </div>
        {showCaption && (
          <div className={styles.imageCaptionContainer}>
            <LexicalNestedComposer initialEditor={caption}>
              <AutoFocusPlugin />
              <MentionsPlugin />
              <LinkPlugin />
              <EmojisPlugin />
              <HashtagPlugin />
              <KeywordsPlugin />
              <HistoryPlugin externalHistoryState={historyState} />
              <RichTextPlugin
                ErrorBoundary={LexicalErrorBoundary}
                contentEditable={<ContentEditable className={styles.imageNodeContentEditable} />}
                placeholder={
                  <Placeholder className={styles.imageNodePlaceholder}>
                    Enter a caption...
                  </Placeholder>
                }
              />
            </LexicalNestedComposer>
          </div>
        )}
        {resizable && $isNodeSelection(selection) && isFocused && (
          <ImageResizer
            buttonRef={buttonRef}
            captionsEnabled={captionsEnabled}
            editor={editor}
            imageRef={imageRef}
            maxWidth={maxWidth}
            onResizeEnd={onResizeEnd}
            onResizeStart={onResizeStart}
            setShowCaption={setShowCaption}
            showCaption={showCaption}
          />
        )}
      </>
    </Suspense>
  )
}

// eslint-disable-next-line import/no-default-export -- This component is lazy loaded.
export default ImageComponent
