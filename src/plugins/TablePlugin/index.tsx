/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  $insertNodes,
  COMMAND_PRIORITY_EDITOR,
  EditorThemeClasses,
  Klass,
  LexicalEditor,
  LexicalNode,
} from "lexical"
import { $createTableNodeWithDimensions, TableNode } from "../../nodes/TableNode"
import { invariant } from "../../shared/invariant"
import { INSERT_NEW_TABLE_COMMAND } from "./const"
import { InsertTableCommandPayload } from "./types"

type CellContextShape = {
  cellEditorConfig: null | CellEditorConfig
  cellEditorPlugins: null | JSX.Element | Array<JSX.Element>
  set: (
    cellEditorConfig: null | CellEditorConfig,
    cellEditorPlugins: null | JSX.Element | Array<JSX.Element>,
  ) => void
}

type CellEditorConfig = Readonly<{
  namespace: string
  nodes?: ReadonlyArray<Klass<LexicalNode>>
  onError: (error: Error, editor: LexicalEditor) => void
  readOnly?: boolean
  theme?: EditorThemeClasses
}>

export const CellContext = createContext<CellContextShape>({
  cellEditorConfig: null,
  cellEditorPlugins: null,
  set: () => {
    // Empty
  },
})

type TableContextProps = { children: JSX.Element }

export function TableContext({ children }: TableContextProps) {
  const [contextValue, setContextValue] = useState<{
    cellEditorConfig: null | CellEditorConfig
    cellEditorPlugins: null | JSX.Element | Array<JSX.Element>
  }>({
    cellEditorConfig: null,
    cellEditorPlugins: null,
  })
  return (
    <CellContext.Provider
      value={useMemo(
        () => ({
          cellEditorConfig: contextValue.cellEditorConfig,
          cellEditorPlugins: contextValue.cellEditorPlugins,
          set: (cellEditorConfig, cellEditorPlugins) => {
            setContextValue({ cellEditorConfig, cellEditorPlugins })
          },
        }),
        [contextValue.cellEditorConfig, contextValue.cellEditorPlugins],
      )}
    >
      {children}
    </CellContext.Provider>
  )
}

type TablePluginProps = {
  cellEditorConfig: CellEditorConfig
  children: JSX.Element | Array<JSX.Element>
}

export function TablePlugin({ cellEditorConfig, children }: TablePluginProps): JSX.Element | null {
  const [editor] = useLexicalComposerContext()
  const cellContext = useContext(CellContext)

  useEffect(() => {
    if (!editor.hasNodes([TableNode])) {
      invariant(false, "TablePlugin: TableNode is not registered on editor")
    }

    cellContext.set(cellEditorConfig, children)

    return editor.registerCommand<InsertTableCommandPayload>(
      INSERT_NEW_TABLE_COMMAND,
      ({ columns, rows, includeHeaders }) => {
        const tableNode = $createTableNodeWithDimensions(
          Number(rows),
          Number(columns),
          includeHeaders,
        )
        $insertNodes([tableNode])
        return true
      },
      COMMAND_PRIORITY_EDITOR,
    )
  }, [cellContext, cellEditorConfig, children, editor])

  return null
}
