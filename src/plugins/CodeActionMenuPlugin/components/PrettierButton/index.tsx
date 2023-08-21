/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useState } from "react"
import { $isCodeNode } from "@lexical/code"
import { $getNearestNodeFromDOMNode, LexicalEditor } from "lexical"
import { Options } from "prettier"
import { IconFormat } from "../../../../Icon/IconFormat"
import styles from "./index.module.scss"
import classNames from "classnames"

interface PrettierButtonProps {
  editor: LexicalEditor
  getCodeDOMNode: () => HTMLElement | null
  lang: string
}

const PRETTIER_PARSER_MODULES = {
  css: () => import("prettier/plugins/postcss"),
  html: () => import("prettier/plugins/html"),
  js: () => import("prettier/plugins/babel"),
  markdown: () => import("prettier/plugins/markdown"),
} as const

type LanguagesType = keyof typeof PRETTIER_PARSER_MODULES

const loadPrettierParserByLang = async (lang: string) => {
  const dynamicImport = PRETTIER_PARSER_MODULES[lang as LanguagesType]

  return await dynamicImport()
}

const loadPrettierFormat = async () => {
  const { format } = await import("prettier/standalone")

  return format
}

const PRETTIER_OPTIONS_BY_LANG: Record<string, Options> = {
  css: {
    parser: "css",
  },
  html: {
    parser: "html",
  },
  js: {
    parser: "babel",
  },
  markdown: {
    parser: "markdown",
  },
}

const LANG_CAN_BE_PRETTIER = Object.keys(PRETTIER_OPTIONS_BY_LANG)

export const canBePrettier = (lang: string): boolean => {
  return LANG_CAN_BE_PRETTIER.includes(lang)
}

const getPrettierOptions = (lang: string): Options => {
  const options = PRETTIER_OPTIONS_BY_LANG[lang]
  if (!options) {
    throw new Error(`CodeActionMenuPlugin: Prettier does not support this language: ${lang}`)
  }

  return options
}

export const PrettierButton = ({ editor, getCodeDOMNode, lang }: PrettierButtonProps) => {
  const [syntaxError, setSyntaxError] = useState<string>("")
  const [tipsVisible, setTipsVisible] = useState<boolean>(false)

  const handleClick = async (): Promise<void> => {
    const codeDOMNode = getCodeDOMNode()

    try {
      const format = await loadPrettierFormat()
      const options = getPrettierOptions(lang)
      options.plugins = [await loadPrettierParserByLang(lang)]

      if (!codeDOMNode) {
        return
      }

      editor.update(async () => {
        const codeNode = $getNearestNodeFromDOMNode(codeDOMNode)

        if ($isCodeNode(codeNode)) {
          const content = codeNode.getTextContent()

          let parsed = ""

          try {
            parsed = await format(content, options)
          } catch (error: unknown) {
            setError(error)
          }

          if (parsed !== "") {
            const selection = codeNode.select(0)
            selection.insertText(parsed)
            setSyntaxError("")
            setTipsVisible(false)
          }
        }
      })
    } catch (error: unknown) {
      setError(error)
    }
  }

  const setError = (error: unknown) => {
    if (error instanceof Error) {
      setSyntaxError(error.message)
      setTipsVisible(true)
    } else {
      console.error("Unexpected error: ", error)
    }
  }

  const handleMouseEnter = () => {
    if (syntaxError !== "") {
      setTipsVisible(true)
    }
  }

  const handleMouseLeave = () => {
    if (syntaxError !== "") {
      setTipsVisible(false)
    }
  }

  return (
    <div className={styles.prettierWrapper}>
      <button
        aria-label="prettier"
        className="menu-item"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {syntaxError ? <IconFormat type="prettier-error" /> : <IconFormat type="prettier" />}
      </button>
      {tipsVisible && (
        <pre className={classNames(styles.codeErrorTips, styles.pre)}>{syntaxError}</pre>
      )}
    </div>
  )
}
