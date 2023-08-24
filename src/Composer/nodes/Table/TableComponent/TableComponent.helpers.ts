import { LexicalEditor } from "lexical"
import { IS_APPLE } from "../../../shared/environment"
import { createRow } from "../TableNode.helpers"
import { Cell, Rows } from "../TableNode.types"

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

export const isTargetOnPossibleUIControl = (target: HTMLElement): boolean => {
  let node: HTMLElement | null = target
  while (node !== null) {
    const nodeName = node.nodeName
    if (nodeName === "BUTTON" || nodeName === "INPUT" || nodeName === "TEXTAREA") {
      return true
    }
    node = node.parentElement
  }

  return false
}

export const getSelectedRect = (
  startID: string,
  endID: string,
  cellCoordMap: Map<string, [number, number]>,
): null | { endX: number; endY: number; startX: number; startY: number } => {
  const startCoords = cellCoordMap.get(startID)
  const endCoords = cellCoordMap.get(endID)
  if (startCoords === undefined || endCoords === undefined) {
    return null
  }
  const startX = Math.min(startCoords[0], endCoords[0])
  const endX = Math.max(startCoords[0], endCoords[0])
  const startY = Math.min(startCoords[1], endCoords[1])
  const endY = Math.max(startCoords[1], endCoords[1])

  return {
    endX,
    endY,
    startX,
    startY,
  }
}

export const getSelectedIDs = (
  rows: Rows,
  startID: string,
  endID: string,
  cellCoordMap: Map<string, [number, number]>,
): Array<string> => {
  const rect = getSelectedRect(startID, endID, cellCoordMap)
  if (rect === null) {
    return []
  }
  const { endX, endY, startX, startY } = rect
  const ids = []

  for (let x = startX; x <= endX; x++) {
    for (let y = startY; y <= endY; y++) {
      ids.push(rows[y].cells[x].id)
    }
  }

  return ids
}

export const extractCellsFromRows = (
  rows: Rows,
  rect: { endX: number; endY: number; startX: number; startY: number },
): Rows => {
  const { endX, endY, startX, startY } = rect
  const newRows: Rows = []

  for (let y = startY; y <= endY; y++) {
    const row = rows[y]
    const newRow = createRow()
    for (let x = startX; x <= endX; x++) {
      const cellClone = { ...row.cells[x] }
      cellClone.id = createUID()
      newRow.cells.push(cellClone)
    }
    newRows.push(newRow)
  }

  return newRows
}

export const getCell = (
  rows: Rows,
  cellID: string,
  cellCoordMap: Map<string, [number, number]>,
): null | Cell => {
  const coords = cellCoordMap.get(cellID)
  if (coords === undefined) {
    return null
  }
  const [x, y] = coords
  const row = rows[y]

  return row.cells[x]
}
