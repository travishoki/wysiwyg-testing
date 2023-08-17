export type SortOptions = { type: "ascending" | "descending"; x: number }

export type Cell = {
  colSpan: number
  id: string
  json: string
  type: "normal" | "header"
  width: number | null
}

export type Rows = Array<Row>

export type Row = {
  cells: Array<Cell>
  height: null | number
  id: string
}
