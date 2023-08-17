import { LexicalEditor } from "lexical"
import { IS_APPLE } from "../../shared/environment"

export const isStartingResize = (target: HTMLElement): boolean => {
  return target.nodeType === 1 && target.hasAttribute("data-table-resize")
}

export const focusCell = (tableElem: HTMLElement, id: string): void => {
  const cellElem = tableElem.querySelector(`[data-id=${id}]`) as HTMLElement
  if (cellElem == null) {
    return
  }
  cellElem.focus()
}

export const getCurrentDocument = (editor: LexicalEditor): Document => {
  const rootElement = editor.getRootElement()

  return rootElement !== null ? rootElement.ownerDocument : document
}

export const isCopy = (
  keyCode: number,
  shiftKey: boolean,
  metaKey: boolean,
  ctrlKey: boolean,
): boolean => {
  if (shiftKey) {
    return false
  }
  if (keyCode === 67) {
    return IS_APPLE ? metaKey : ctrlKey
  }

  return false
}

export const isCut = (
  keyCode: number,
  shiftKey: boolean,
  metaKey: boolean,
  ctrlKey: boolean,
): boolean => {
  if (shiftKey) {
    return false
  }
  if (keyCode === 88) {
    return IS_APPLE ? metaKey : ctrlKey
  }

  return false
}

export const isPaste = (
  keyCode: number,
  shiftKey: boolean,
  metaKey: boolean,
  ctrlKey: boolean,
): boolean => {
  if (shiftKey) {
    return false
  }
  if (keyCode === 86) {
    return IS_APPLE ? metaKey : ctrlKey
  }

  return false
}

export const getCellID = (domElement: HTMLElement): null | string => {
  let node: null | HTMLElement = domElement
  while (node !== null) {
    const possibleID = node.getAttribute("data-id")
    if (possibleID != null) {
      return possibleID
    }
    node = node.parentElement
  }

  return null
}

export const getTableCellWidth = (domElement: HTMLElement): number => {
  let node: null | HTMLElement = domElement
  while (node !== null) {
    if (node.nodeName === "TH" || node.nodeName === "TD") {
      return node.getBoundingClientRect().width
    }
    node = node.parentElement
  }

  return 0
}
