/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { COMMAND_PRIORITY_CRITICAL, INDENT_CONTENT_COMMAND } from "lexical"
import { isIndentPermitted } from "./helpers"

type ListMaxIndentLevelPluginProps = Readonly<{
  maxDepth: number | null | undefined
}>

export const ListMaxIndentLevelPlugin = ({ maxDepth }: ListMaxIndentLevelPluginProps): null => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerCommand(
      INDENT_CONTENT_COMMAND,
      () => !isIndentPermitted(maxDepth ?? 7),
      COMMAND_PRIORITY_CRITICAL,
    )
  }, [editor, maxDepth])
  return null
}
