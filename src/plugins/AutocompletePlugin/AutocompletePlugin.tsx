/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useCallback, useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $isAtNodeEnd } from "@lexical/selection"
import { mergeRegister } from "@lexical/utils"
import {
  $createTextNode,
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  $setSelection,
  COMMAND_PRIORITY_LOW,
  GridSelection,
  KEY_ARROW_RIGHT_COMMAND,
  KEY_TAB_COMMAND,
  NodeKey,
  NodeSelection,
  RangeSelection,
} from "lexical"
import { useSharedAutocompleteContext } from "../../context/SharedAutocompleteContext"
import { addSwipeRightListener } from "../../helpers/swipe"
import {
  $createAutocompleteNode,
  AutocompleteNode,
} from "../../nodes/Autocomplete/AutocompleteNode"
import { AutocompleteServer } from "./AutocompleteServer/AutocompleteServer"
import { SearchPromise } from "./types"

export const uuid = Math.random()
  .toString(36)
  .replace(/[^a-z]+/g, "")
  .substr(0, 5)

// TODO lookup should be custom
const $search = (
  selection: null | RangeSelection | NodeSelection | GridSelection,
): [boolean, string] => {
  if (!$isRangeSelection(selection) || !selection.isCollapsed()) {
    return [false, ""]
  }
  const node = selection.getNodes()[0]
  const anchor = selection.anchor
  // Check siblings?
  if (!$isTextNode(node) || !node.isSimpleText() || !$isAtNodeEnd(anchor)) {
    return [false, ""]
  }
  const word = []
  const text = node.getTextContent()
  let i = node.getTextContentSize()
  let c
  while (i-- && i >= 0 && (c = text[i]) !== " ") {
    word.push(c)
  }
  if (word.length === 0) {
    return [false, ""]
  }

  return [true, word.reverse().join("")]
}

// TODO query should be custom
const useQuery = (): ((searchText: string) => SearchPromise) => {
  return useCallback((searchText: string) => {
    const server = new AutocompleteServer()
    // console.time("query")
    const response = server.query(searchText)

    // console.timeEnd("query")
    return response
  }, [])
}

export const AutocompletePlugin = (): JSX.Element | null => {
  const [editor] = useLexicalComposerContext()
  const [, setSuggestion] = useSharedAutocompleteContext()
  const query = useQuery()

  useEffect(() => {
    let autocompleteNodeKey: null | NodeKey = null
    let lastMatch: null | string = null
    let lastSuggestion: null | string = null
    let searchPromise: null | SearchPromise = null

    const $clearSuggestion = () => {
      const autocompleteNode =
        autocompleteNodeKey !== null ? $getNodeByKey(autocompleteNodeKey) : null
      if (autocompleteNode !== null && autocompleteNode.isAttached()) {
        autocompleteNode.remove()
        autocompleteNodeKey = null
      }
      if (searchPromise !== null) {
        searchPromise.dismiss()
        searchPromise = null
      }
      lastMatch = null
      lastSuggestion = null
      setSuggestion(null)
    }

    const updateAsyncSuggestion = (
      refSearchPromise: SearchPromise,
      newSuggestion: null | string,
    ) => {
      if (searchPromise !== refSearchPromise || newSuggestion === null) {
        // Outdated or no suggestion
        return
      }
      editor.update(
        () => {
          const selection = $getSelection()
          const [hasMatch, match] = $search(selection)
          if (!hasMatch || match !== lastMatch || !$isRangeSelection(selection)) {
            // Outdated
            return
          }
          const selectionCopy = selection.clone()
          const node = $createAutocompleteNode(uuid)
          autocompleteNodeKey = node.getKey()
          selection.insertNodes([node])
          $setSelection(selectionCopy)
          lastSuggestion = newSuggestion
          setSuggestion(newSuggestion)
        },
        { tag: "history-merge" },
      )
    }

    const handleAutocompleteNodeTransform = (node: AutocompleteNode) => {
      const key = node.getKey()
      if (node.__uuid === uuid && key !== autocompleteNodeKey) {
        // Max one Autocomplete node per session
        $clearSuggestion()
      }
    }

    const handleUpdate = () => {
      editor.update(() => {
        const selection = $getSelection()
        const [hasMatch, match] = $search(selection)
        if (!hasMatch) {
          $clearSuggestion()

          return
        }
        if (match === lastMatch) {
          return
        }
        $clearSuggestion()
        searchPromise = query(match)
        searchPromise.promise
          .then((newSuggestion) => {
            if (searchPromise !== null) {
              updateAsyncSuggestion(searchPromise, newSuggestion)
            }
          })
          .catch((e) => {
            console.error(e)
          })
        lastMatch = match
      })
    }

    const $handleAutocompleteIntent = (): boolean => {
      if (lastSuggestion === null || autocompleteNodeKey === null) {
        return false
      }
      const autocompleteNode = $getNodeByKey(autocompleteNodeKey)
      if (autocompleteNode === null) {
        return false
      }
      const textNode = $createTextNode(lastSuggestion)
      autocompleteNode.replace(textNode)
      textNode.selectNext()
      $clearSuggestion()

      return true
    }

    const $handleKeypressCommand = (e: Event) => {
      if ($handleAutocompleteIntent()) {
        e.preventDefault()

        return true
      }

      return false
    }

    const handleSwipeRight = (_force: number, e: TouchEvent) => {
      editor.update(() => {
        if ($handleAutocompleteIntent()) {
          e.preventDefault()
        }
      })
    }
    const unmountSuggestion = () => {
      editor.update(() => {
        $clearSuggestion()
      })
    }

    const rootElem = editor.getRootElement()

    return mergeRegister(
      editor.registerNodeTransform(AutocompleteNode, handleAutocompleteNodeTransform),
      editor.registerUpdateListener(handleUpdate),
      editor.registerCommand(KEY_TAB_COMMAND, $handleKeypressCommand, COMMAND_PRIORITY_LOW),
      editor.registerCommand(KEY_ARROW_RIGHT_COMMAND, $handleKeypressCommand, COMMAND_PRIORITY_LOW),
      ...(rootElem !== null ? [addSwipeRightListener(rootElem, handleSwipeRight)] : []),
      unmountSuggestion,
    )
  }, [editor, query, setSuggestion])

  return null
}
