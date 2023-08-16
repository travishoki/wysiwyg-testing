/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useFloatingTextFormatToolbar } from "./hooks"
import "./index.css"

type FloatingTextFormatToolbarPluginProps = {
  anchorElem?: HTMLElement
}

export const FloatingTextFormatToolbarPlugin = ({
  anchorElem = document.body,
}: FloatingTextFormatToolbarPluginProps): JSX.Element | null => {
  const [editor] = useLexicalComposerContext()
  return useFloatingTextFormatToolbar(editor, anchorElem)
}
