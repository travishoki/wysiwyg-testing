/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { DRAG_DROP_PASTE } from "@lexical/rich-text"
import { isMimeType, mediaFileReader } from "@lexical/utils"
import { COMMAND_PRIORITY_LOW } from "lexical"
import { INSERT_IMAGE_COMMAND } from "../ImagesPlugin/ImagesPlugin.const"

const ACCEPTABLE_IMAGE_TYPES = ["image/", "image/heic", "image/heif", "image/gif", "image/webp"]

export const DragDropPaste = (): null => {
  const [editor] = useLexicalComposerContext()
  useEffect(() => {
    return editor.registerCommand(
      DRAG_DROP_PASTE,
      (files) => {
        ;(async () => {
          const filesResult = await mediaFileReader(
            files,
            [ACCEPTABLE_IMAGE_TYPES].flatMap((x) => x),
          )

          filesResult.forEach((fileResult) => {
            const { file, result } = fileResult
            if (isMimeType(file, ACCEPTABLE_IMAGE_TYPES)) {
              editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
                altText: file.name,
                src: result,
              })
            }
          })
        })()

        return true
      },
      COMMAND_PRIORITY_LOW,
    )
  }, [editor])

  return null
}
