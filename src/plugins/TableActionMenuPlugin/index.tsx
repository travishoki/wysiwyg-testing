/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { ReactPortal } from "react"
import useLexicalEditable from "@lexical/react/useLexicalEditable"
import { createPortal } from "react-dom"
import { TableCellActionMenuContainer } from "./TableCellActionMenuContainer"

type TableActionMenuPluginProps = {
  anchorElem?: HTMLElement
  cellMerge?: boolean
}

export const TableActionMenuPlugin = ({
  anchorElem = document.body,
  cellMerge = false,
}: TableActionMenuPluginProps): null | ReactPortal => {
  const isEditable = useLexicalEditable()

  return createPortal(
    isEditable ? (
      <TableCellActionMenuContainer anchorElem={anchorElem} cellMerge={cellMerge} />
    ) : null,
    anchorElem,
  )
}
