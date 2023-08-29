/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react"

type Suggestion = null | string
type CallbackFn = (newSuggestion: Suggestion) => void
type SubscribeFn = (callbackFn: CallbackFn) => () => void
type PublishFn = (newSuggestion: Suggestion) => void
type ContextShape = [SubscribeFn, PublishFn]
type HookShape = [suggestion: Suggestion, setSuggestion: PublishFn]

const Context: React.Context<ContextShape> = createContext([
  (_cb) => () => {},
  (_newSuggestion: Suggestion) => {},
])

type SharedAutocompleteContextProps = {
  children: ReactNode
}

export const SharedAutocompleteContext = ({ children }: SharedAutocompleteContextProps) => {
  const context: ContextShape = useMemo(() => {
    let suggestion: Suggestion | null = null
    const listeners: Set<CallbackFn> = new Set()

    return [
      (cb: (newSuggestion: Suggestion) => void) => {
        cb(suggestion)
        listeners.add(cb)

        return () => {
          listeners.delete(cb)
        }
      },
      (newSuggestion: Suggestion) => {
        suggestion = newSuggestion
        listeners.forEach((listener) => {
          listener(newSuggestion)
        })
      },
    ]
  }, [])

  return <Context.Provider value={context}>{children}</Context.Provider>
}

export const useSharedAutocompleteContext = (): HookShape => {
  const [subscribe, publish]: ContextShape = useContext(Context)
  const [suggestion, setSuggestion] = useState<Suggestion>(null)
  useEffect(() => {
    return subscribe((newSuggestion: Suggestion) => {
      setSuggestion(newSuggestion)
    })
  }, [subscribe])

  return [suggestion, publish]
}
