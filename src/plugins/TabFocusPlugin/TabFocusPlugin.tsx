/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getSelection, $isRangeSelection, $setSelection, FOCUS_COMMAND } from "lexical"
import { COMMAND_PRIORITY_LOW, TAB_TO_FOCUS_INTERVAL } from "./const"

let lastTabKeyDownTimestamp = 0
let hasRegisteredKeyDownListener = false

const registerKeyTimeStampTracker = () => {
  window.addEventListener(
    "keydown",
    (event: KeyboardEvent) => {
      // Tab
      if (event.keyCode === 9) {
        lastTabKeyDownTimestamp = event.timeStamp
      }
    },
    true,
  )
}

export const TabFocusPlugin = (): null => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!hasRegisteredKeyDownListener) {
      registerKeyTimeStampTracker()
      hasRegisteredKeyDownListener = true
    }

    return editor.registerCommand(
      FOCUS_COMMAND,
      (event: FocusEvent) => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          if (lastTabKeyDownTimestamp + TAB_TO_FOCUS_INTERVAL > event.timeStamp) {
            $setSelection(selection.clone())
          }
        }

        return false
      },
      COMMAND_PRIORITY_LOW,
    )
  }, [editor])

  return null
}
