/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react"
import { useCallback, useMemo } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { LexicalContextMenuPlugin } from "@lexical/react/LexicalContextMenuPlugin"
import { $getSelection, $isRangeSelection, COPY_COMMAND, CUT_COMMAND, PASTE_COMMAND } from "lexical"
import * as ReactDOM from "react-dom"
import { ContextMenu } from "./ContextMenu"
import { ContextMenuOption } from "./ContextMenuOption"
import type { LexicalNode } from "lexical"

export function ContextMenuPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext()

  const options = useMemo(() => {
    return [
      new ContextMenuOption(`Copy`, {
        onSelect: (_node) => {
          editor.dispatchCommand(COPY_COMMAND, null)
        },
      }),
      new ContextMenuOption(`Cut`, {
        onSelect: (_node) => {
          editor.dispatchCommand(CUT_COMMAND, null)
        },
      }),
      new ContextMenuOption(`Paste`, {
        onSelect: (_node) => {
          navigator.clipboard.read().then(async (..._args) => {
            const data = new DataTransfer()

            const items = await navigator.clipboard.read()
            const item = items[0]

            const permission = await navigator.permissions.query({
              // @ts-ignore These types are incorrect.
              name: "clipboard-read",
            })
            if (permission.state === "denied") {
              alert("Not allowed to paste from clipboard.")
              return
            }

            for (const type of item.types) {
              const dataString = await (await item.getType(type)).text()
              data.setData(type, dataString)
            }

            const event = new ClipboardEvent("paste", {
              clipboardData: data,
            })

            editor.dispatchCommand(PASTE_COMMAND, event)
          })
        },
      }),
      new ContextMenuOption(`Paste as Plain Text`, {
        onSelect: (_node) => {
          navigator.clipboard.read().then(async (..._args) => {
            const permission = await navigator.permissions.query({
              // @ts-ignore These types are incorrect.
              name: "clipboard-read",
            })

            if (permission.state === "denied") {
              alert("Not allowed to paste from clipboard.")
              return
            }

            const data = new DataTransfer()
            const items = await navigator.clipboard.readText()
            data.setData("text/plain", items)

            const event = new ClipboardEvent("paste", {
              clipboardData: data,
            })
            editor.dispatchCommand(PASTE_COMMAND, event)
          })
        },
      }),
      new ContextMenuOption(`Delete Node`, {
        onSelect: (_node) => {
          const selection = $getSelection()
          if ($isRangeSelection(selection)) {
            const currentNode = selection.anchor.getNode()
            const ancestorNodeWithRootAsParent = currentNode.getParents().at(-2)

            ancestorNodeWithRootAsParent?.remove()
          }
        },
      }),
    ]
  }, [editor])

  const onSelectOption = useCallback(
    (selectedOption: ContextMenuOption, targetNode: LexicalNode | null, closeMenu: () => void) => {
      editor.update(() => {
        selectedOption.onSelect(targetNode)
        closeMenu()
      })
    },
    [editor],
  )

  return (
    <LexicalContextMenuPlugin
      options={options}
      onSelectOption={onSelectOption}
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, options: _options, selectOptionAndCleanUp, setHighlightedIndex },
        { setMenuRef },
      ) =>
        anchorElementRef.current
          ? ReactDOM.createPortal(
              <div
                className="typeahead-popover auto-embed-menu"
                style={{
                  marginLeft: anchorElementRef.current.style.width,
                  userSelect: "none",
                  width: 200,
                }}
                ref={setMenuRef}
              >
                <ContextMenu
                  options={options}
                  selectedItemIndex={selectedIndex}
                  onOptionClick={(option: ContextMenuOption, index: number) => {
                    setHighlightedIndex(index)
                    selectOptionAndCleanUp(option)
                  }}
                  onOptionMouseEnter={(index: number) => {
                    setHighlightedIndex(index)
                  }}
                />
              </div>,
              anchorElementRef.current,
            )
          : null
      }
    />
  )
}
