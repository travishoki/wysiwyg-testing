import { EditorThemeClasses, Klass, LexicalEditor, LexicalNode } from "lexical"

export type InsertTableCommandPayload = Readonly<{
  columns: string
  includeHeaders?: boolean
  rows: string
}>

export type CellEditorConfig = Readonly<{
  namespace: string
  nodes?: ReadonlyArray<Klass<LexicalNode>>
  onError: (error: Error, editor: LexicalEditor) => void
  readOnly?: boolean
  theme?: EditorThemeClasses
}>
