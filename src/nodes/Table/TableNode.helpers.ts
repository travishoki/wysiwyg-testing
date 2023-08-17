import { cellHTMLCache } from "./const"
import { Cell, Row, Rows } from "./types"

export const createUID = (): string => {
  return Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "")
    .substr(0, 5)
}

export const createRow = (): Row => {
  return {
    cells: [],
    height: null,
    id: createUID(),
  }
}

const emptyEditorJSON =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'

export const plainTextEditorJSON = (text: string) =>
  text === ""
    ? emptyEditorJSON
    : `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":${text},"type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`

export const createCell = (type: "normal" | "header"): Cell => {
  return {
    colSpan: 1,
    id: createUID(),
    json: emptyEditorJSON,
    type,
    width: null,
  }
}

export const extractRowsFromHTML = (tableElem: HTMLTableElement): Rows => {
  const rowElems = tableElem.querySelectorAll("tr")
  const rows: Rows = []
  for (let y = 0; y < rowElems.length; y++) {
    const rowElem = rowElems[y]
    const cellElems = rowElem.querySelectorAll("td,th")
    if (!cellElems || cellElems.length === 0) {
      continue
    }
    const cells: Array<Cell> = []
    for (let x = 0; x < cellElems.length; x++) {
      const cellElem = cellElems[x] as HTMLElement
      const isHeader = cellElem.nodeName === "TH"
      const cell = createCell(isHeader ? "header" : "normal")
      cell.json = plainTextEditorJSON(JSON.stringify(cellElem.innerText.replace(/\n/g, " ")))
      cells.push(cell)
    }
    const row = createRow()
    row.cells = cells
    rows.push(row)
  }

  return rows
}

export const exportTableCellsToHTML = (
  rows: Rows,
  rect?: { endX: number; endY: number; startX: number; startY: number },
): HTMLElement => {
  const table = document.createElement("table")
  const colGroup = document.createElement("colgroup")
  const tBody = document.createElement("tbody")
  const firstRow = rows[0]

  for (
    let x = rect != null ? rect.startX : 0;
    x < (rect != null ? rect.endX + 1 : firstRow.cells.length);
    x++
  ) {
    const col = document.createElement("col")
    colGroup.append(col)
  }

  for (
    let y = rect != null ? rect.startY : 0;
    y < (rect != null ? rect.endY + 1 : rows.length);
    y++
  ) {
    const row = rows[y]
    const cells = row.cells
    const rowElem = document.createElement("tr")

    for (
      let x = rect != null ? rect.startX : 0;
      x < (rect != null ? rect.endX + 1 : cells.length);
      x++
    ) {
      const cell = cells[x]
      const cellElem = document.createElement(cell.type === "header" ? "th" : "td")
      cellElem.innerHTML = cellHTMLCache.get(cell.json) || ""
      rowElem.appendChild(cellElem)
    }
    tBody.appendChild(rowElem)
  }

  table.appendChild(colGroup)
  table.appendChild(tBody)

  return table
}
