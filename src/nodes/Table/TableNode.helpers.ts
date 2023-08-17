import { Row } from "./types"

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
