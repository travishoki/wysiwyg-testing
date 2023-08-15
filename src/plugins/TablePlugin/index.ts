/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useContext, useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $insertNodes, COMMAND_PRIORITY_EDITOR } from "lexical"
import { $createTableNodeWithDimensions, TableNode } from "../../nodes/TableNode"
import { invariant } from "../../shared/invariant"
import { CellContext, INSERT_NEW_TABLE_COMMAND } from "./const"
import { CellEditorConfig, InsertTableCommandPayload } from "./types"

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
