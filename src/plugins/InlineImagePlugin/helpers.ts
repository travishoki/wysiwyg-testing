import {
  $createRangeSelection,
  $getSelection,
  $isNodeSelection,
  $setSelection,
  LexicalEditor,
} from "lexical"
import { $isInlineImageNode, InlineImageNode } from "../../nodes/InlineImage/InlineImageNode"
import { CAN_USE_DOM } from "../../shared/canUseDOM"
import { INSERT_INLINE_IMAGE_COMMAND } from "./const"
import { InsertInlineImagePayload } from "./types"

const getDOMSelection = (targetWindow: Window | null): Selection | null =>
  CAN_USE_DOM ? (targetWindow || window).getSelection() : null

const TRANSPARENT_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
const img = document.createElement("img")
img.src = TRANSPARENT_IMAGE

export const onDragStart = (event: DragEvent): boolean => {
  const node = getImageNodeInSelection()
  if (!node) {
    return false
  }
  const dataTransfer = event.dataTransfer
  if (!dataTransfer) {
    return false
  }
  dataTransfer.setData("text/plain", "_")
  dataTransfer.setDragImage(img, 0, 0)
  dataTransfer.setData(
    "application/x-lexical-drag",
    JSON.stringify({
      data: {
        altText: node.__altText,
        caption: node.__caption,
        height: node.__height,
        key: node.getKey(),
        showCaption: node.__showCaption,
        src: node.__src,
        width: node.__width,
      },
      type: "image",
    }),
  )

  return true
}

export const onDragover = (event: DragEvent): boolean => {
  const node = getImageNodeInSelection()
  if (!node) {
    return false
  }
  if (!canDropImage(event)) {
    event.preventDefault()
  }

  return true
}

export const onDrop = (event: DragEvent, editor: LexicalEditor): boolean => {
  const node = getImageNodeInSelection()
  if (!node) {
    return false
  }
  const data = getDragImageData(event)
  if (!data) {
    return false
  }
  event.preventDefault()
  if (canDropImage(event)) {
    const range = getDragSelection(event)
    node.remove()
    const rangeSelection = $createRangeSelection()
    if (range !== null && range !== undefined) {
      rangeSelection.applyDOMRange(range)
    }
    $setSelection(rangeSelection)
    editor.dispatchCommand(INSERT_INLINE_IMAGE_COMMAND, data)
  }

  return true
}

const getImageNodeInSelection = (): InlineImageNode | null => {
  const selection = $getSelection()
  if (!$isNodeSelection(selection)) {
    return null
  }
  const nodes = selection.getNodes()
  const node = nodes[0]

  return $isInlineImageNode(node) ? node : null
}

const getDragImageData = (event: DragEvent): null | InsertInlineImagePayload => {
  const dragData = event.dataTransfer?.getData("application/x-lexical-drag")
  if (!dragData) {
    return null
  }
  const { data, type } = JSON.parse(dragData)
  if (type !== "image") {
    return null
  }

  return data
}

declare global {
  interface DragEvent {
    rangeOffset?: number
    rangeParent?: Node
  }
}

const canDropImage = (event: DragEvent): boolean => {
  const target = event.target

  return !!(
    target &&
    target instanceof HTMLElement &&
    !target.closest("code, span.editor-image") &&
    target.parentElement &&
    target.parentElement.closest("div.ContentEditable__root")
  )
}

const getDragSelection = (event: DragEvent): Range | null | undefined => {
  let range
  const target = event.target as null | Element | Document
  const targetWindow =
    target == null
      ? null
      : target.nodeType === 9
      ? (target as Document).defaultView
      : (target as Element).ownerDocument.defaultView
  const domSelection = getDOMSelection(targetWindow)
  if (document.caretRangeFromPoint) {
    range = document.caretRangeFromPoint(event.clientX, event.clientY)
  } else if (event.rangeParent && domSelection !== null) {
    domSelection.collapse(event.rangeParent, event.rangeOffset || 0)
    range = domSelection.getRangeAt(0)
  } else {
    throw Error("Cannot get the selection when dragging")
  }

  return range
}
