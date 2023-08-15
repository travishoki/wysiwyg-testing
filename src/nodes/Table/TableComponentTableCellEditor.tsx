import * as React from "react"
import { useContext } from "react"
import { LexicalNestedComposer } from "@lexical/react/LexicalNestedComposer"
import { LexicalEditor } from "lexical"
import { CellContext } from "../../plugins/TablePlugin/const"

type TableCellEditorProps = {
  cellEditor: LexicalEditor
}

export const TableCellEditor = ({ cellEditor }: TableCellEditorProps) => {
  const { cellEditorConfig, cellEditorPlugins } = useContext(CellContext)

  if (cellEditorPlugins === null || cellEditorConfig === null) {
    return null
  }

  return (
    <LexicalNestedComposer
      initialEditor={cellEditor}
      initialTheme={cellEditorConfig.theme}
      initialNodes={cellEditorConfig.nodes}
      skipCollabChecks={true}
    >
      {cellEditorPlugins}
    </LexicalNestedComposer>
  )
}
