/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  LexicalTypeaheadMenuPlugin,
  MenuTextMatch,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin"
import { TextNode } from "lexical"
import * as ReactDOM from "react-dom"
import { IconDropdown } from "../../Icon/IconDropdown/IconDropdown"
import { TypeaheadPopover } from "../../TypeaheadPopover/TypeaheadPopover"
import { $createMentionNode } from "../../nodes/Mention/MentionNode"
import { MentionTypeaheadOption } from "./MentionTypeaheadOption/MentionTypeaheadOption"
import {
  AtSignMentionsRegex,
  AtSignMentionsRegexAliasRegex,
  CapitalizedNameMentionsRegex,
  SUGGESTION_LIST_LENGTH_LIMIT,
  dummyMentionsData,
  mentionsCache,
} from "./MentionsPlugin.const"
import styles from "./MentionsPlugin.module.scss"
import { MentionsTypeaheadMenuItem } from "./MentionsTypeaheadMenuItem/MentionsTypeaheadMenuItem"

const dummyLookupService = {
  search(string: string, callback: (results: Array<string>) => void): void {
    setTimeout(() => {
      const results = dummyMentionsData.filter((mention) =>
        mention.toLowerCase().includes(string.toLowerCase()),
      )
      callback(results)
    }, 500)
  },
}

const useMentionLookupService = (mentionString: string | null) => {
  const [results, setResults] = useState<Array<string>>([])

  useEffect(() => {
    const cachedResults = mentionsCache.get(mentionString)

    if (mentionString == null) {
      setResults([])

      return
    }

    if (cachedResults === null) {
      return
    } else if (cachedResults !== undefined) {
      setResults(cachedResults)

      return
    }

    mentionsCache.set(mentionString, null)
    dummyLookupService.search(mentionString, (newResults) => {
      mentionsCache.set(mentionString, newResults)
      setResults(newResults)
    })
  }, [mentionString])

  return results
}

const checkForCapitalizedNameMentions = (
  text: string,
  minMatchLength: number,
): MenuTextMatch | null => {
  const match = CapitalizedNameMentionsRegex.exec(text)
  if (match !== null) {
    // The strategy ignores leading whitespace but we need to know it's
    // length to add it to the leadOffset
    const maybeLeadingWhitespace = match[1]

    const matchingString = match[2]
    if (matchingString != null && matchingString.length >= minMatchLength) {
      return {
        leadOffset: match.index + maybeLeadingWhitespace.length,
        matchingString,
        replaceableString: matchingString,
      }
    }
  }

  return null
}

const checkForAtSignMentions = (text: string, minMatchLength: number): MenuTextMatch | null => {
  let match = AtSignMentionsRegex.exec(text)

  if (match === null) {
    match = AtSignMentionsRegexAliasRegex.exec(text)
  }
  if (match !== null) {
    // The strategy ignores leading whitespace but we need to know it's
    // length to add it to the leadOffset
    const maybeLeadingWhitespace = match[1]

    const matchingString = match[3]
    if (matchingString.length >= minMatchLength) {
      return {
        leadOffset: match.index + maybeLeadingWhitespace.length,
        matchingString,
        replaceableString: match[2],
      }
    }
  }

  return null
}

const getPossibleQueryMatch = (text: string): MenuTextMatch | null => {
  const match = checkForAtSignMentions(text, 1)

  return match === null ? checkForCapitalizedNameMentions(text, 3) : match
}

export const MentionsPlugin = (): JSX.Element | null => {
  const [editor] = useLexicalComposerContext()

  const [queryString, setQueryString] = useState<string | null>(null)

  const results = useMentionLookupService(queryString)

  const checkForSlashTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
    minLength: 0,
  })

  const options = useMemo(
    () =>
      results
        .map((result) => new MentionTypeaheadOption(result, <IconDropdown type="user" />))
        .slice(0, SUGGESTION_LIST_LENGTH_LIMIT),
    [results],
  )

  const onSelectOption = useCallback(
    (
      selectedOption: MentionTypeaheadOption,
      nodeToReplace: TextNode | null,
      closeMenu: () => void,
    ) => {
      editor.update(() => {
        const mentionNode = $createMentionNode(selectedOption.name)
        if (nodeToReplace) {
          nodeToReplace.replace(mentionNode)
        }
        mentionNode.select()
        closeMenu()
      })
    },
    [editor],
  )

  const checkForMentionMatch = useCallback(
    (text: string) => {
      const slashMatch = checkForSlashTriggerMatch(text, editor)
      if (slashMatch !== null) {
        return null
      }

      return getPossibleQueryMatch(text)
    },
    [checkForSlashTriggerMatch, editor],
  )

  return (
    <LexicalTypeaheadMenuPlugin<MentionTypeaheadOption>
      menuRenderFn={(
        anchorElementRef,
        { selectOptionAndCleanUp, selectedIndex, setHighlightedIndex },
      ) =>
        anchorElementRef.current && results.length
          ? ReactDOM.createPortal(
              <TypeaheadPopover className={styles.mentionsMenu}>
                <ul>
                  {options.map((option, i: number) => (
                    <MentionsTypeaheadMenuItem
                      index={i}
                      isSelected={selectedIndex === i}
                      key={option.key}
                      onClick={() => {
                        setHighlightedIndex(i)
                        selectOptionAndCleanUp(option)
                      }}
                      onMouseEnter={() => {
                        setHighlightedIndex(i)
                      }}
                      option={option}
                    />
                  ))}
                </ul>
              </TypeaheadPopover>,
              anchorElementRef.current,
            )
          : null
      }
      onQueryChange={setQueryString}
      onSelectOption={onSelectOption}
      options={options}
      triggerFn={checkForMentionMatch}
    />
  )
}
