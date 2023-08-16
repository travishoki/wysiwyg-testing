import * as React from "react"
import { useMemo, useState } from "react"
import { CellContext } from "./const"
import { CellEditorConfig } from "./types"

type TableContextProps = { children: JSX.Element }

export const TableContext = ({ children }: TableContextProps) => {
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
