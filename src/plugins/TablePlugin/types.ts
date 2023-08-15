export type InsertTableCommandPayload = Readonly<{
  columns: string
  rows: string
  includeHeaders?: boolean
}>
