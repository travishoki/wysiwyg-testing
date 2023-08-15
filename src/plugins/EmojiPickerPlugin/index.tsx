/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  LexicalTypeaheadMenuPlugin,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin"
import { $createTextNode, $getSelection, $isRangeSelection, TextNode } from "lexical"
import * as ReactDOM from "react-dom"
import { EmojiMenuItem } from "./EmojiMenuItem.js"
import { EmojiOption } from "./EmojiOption.js"

type Emoji = {
  emoji: string
  description: string
  category: string
  aliases: Array<string>
  tags: Array<string>
  unicode_version: string
  ios_version: string
  skin_tones?: boolean
}

const MAX_EMOJI_SUGGESTION_COUNT = 10

export function EmojiPickerPlugin() {
  const [editor] = useLexicalComposerContext()
  const [queryString, setQueryString] = useState<string | null>(null)
  const [emojis, setEmojis] = useState<Array<Emoji>>([])

  useEffect(() => {
    // @ts-ignore
    import("../../utils/emoji-list.ts").then((file) => setEmojis(file.default))
  }, [])

  const emojiOptions = useMemo(
    () =>
      emojis != null
        ? emojis.map(
            ({ emoji, aliases, tags }) =>
              new EmojiOption(aliases[0], emoji, {
                keywords: [...aliases, ...tags],
              }),
          )
        : [],
    [emojis],
  )

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch(":", {
    minLength: 0,
  })

  const options: Array<EmojiOption> = useMemo(() => {
    return emojiOptions
      .filter((option: EmojiOption) => {
        return queryString != null
          ? new RegExp(queryString, "gi").exec(option.title) || option.keywords != null
            ? option.keywords.some((keyword: string) => new RegExp(queryString, "gi").exec(keyword))
            : false
          : emojiOptions
      })
      .slice(0, MAX_EMOJI_SUGGESTION_COUNT)
  }, [emojiOptions, queryString])

  const onSelectOption = useCallback(
    (selectedOption: EmojiOption, nodeToRemove: TextNode | null, closeMenu: () => void) => {
      editor.update(() => {
        const selection = $getSelection()

        if (!$isRangeSelection(selection) || selectedOption == null) {
          return
        }

        if (nodeToRemove) {
          nodeToRemove.remove()
        }

        selection.insertNodes([$createTextNode(selectedOption.emoji)])

        closeMenu()
      })
    },
    [editor],
  )

  return (
    <LexicalTypeaheadMenuPlugin
      onQueryChange={setQueryString}
      onSelectOption={onSelectOption}
      triggerFn={checkForTriggerMatch}
      options={options}
      menuRenderFn={(
        anchorElementRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex },
      ) => {
        if (anchorElementRef.current == null || options.length === 0) {
          return null
        }

        return anchorElementRef.current && options.length
          ? ReactDOM.createPortal(
              <div className="typeahead-popover emoji-menu">
                <ul>
                  {options.map((option: EmojiOption, index) => (
                    <div key={option.key}>
                      <EmojiMenuItem
                        index={index}
                        isSelected={selectedIndex === index}
                        onClick={() => {
                          setHighlightedIndex(index)
                          selectOptionAndCleanUp(option)
                        }}
                        onMouseEnter={() => {
                          setHighlightedIndex(index)
                        }}
                        option={option}
                      />
                    </div>
                  ))}
                </ul>
              </div>,
              anchorElementRef.current,
            )
          : null
      }}
    />
  )
}
