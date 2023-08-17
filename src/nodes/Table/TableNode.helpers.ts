import { Cell, Row } from "./types"

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
