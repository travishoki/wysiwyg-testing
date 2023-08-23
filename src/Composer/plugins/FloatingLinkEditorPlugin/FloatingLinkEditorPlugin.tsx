/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { useFloatingLinkEditorToolbar } from "./hooks"

type FloatingLinkEditorPluginProps = {
  anchorElem?: HTMLElement
}

export const FloatingLinkEditorPlugin = ({
  anchorElem = document.body,
}: FloatingLinkEditorPluginProps): JSX.Element | null => {
  const [editor] = useLexicalComposerContext()

  return useFloatingLinkEditorToolbar(editor, anchorElem)
}
