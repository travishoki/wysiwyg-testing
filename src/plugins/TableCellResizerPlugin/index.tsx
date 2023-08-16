/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import * as React from "react"
import { ReactPortal, useMemo } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import useLexicalEditable from "@lexical/react/useLexicalEditable"
import { createPortal } from "react-dom"
import "./index.css"
import { TableCellResizer } from "./TableCellResizer"

export const TableCellResizerPlugin = (): null | ReactPortal => {
  const [editor] = useLexicalComposerContext()
  const isEditable = useLexicalEditable()

  return useMemo(
    () => (isEditable ? createPortal(<TableCellResizer editor={editor} />, document.body) : null),
    [editor, isEditable],
  )
}
