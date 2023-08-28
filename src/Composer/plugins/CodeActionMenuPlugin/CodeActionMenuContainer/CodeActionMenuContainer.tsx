import React, { useEffect, useRef, useState } from "react"
import { $isCodeNode, CodeNode, getLanguageFriendlyName } from "@lexical/code"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import classNames from "classnames"
import { $getNearestNodeFromDOMNode } from "lexical"
import { CopyButton } from "../CopyButton/CopyButton"
import { useDebounce } from "../hooks"
import { getMouseInfo } from "./CodeActionMenuContainer.helpers"
import styles from "./CodeActionMenuContainer.module.scss"

const CODE_PADDING = 8

interface Position {
  right: string
  top: string
}

type CodeActionMenuContainerProps = {
  anchorElem: HTMLElement
}

export const CodeActionMenuContainer = ({ anchorElem }: CodeActionMenuContainerProps) => {
  const [editor] = useLexicalComposerContext()

  const [lang, setLang] = useState("")
  const [isShown, setShown] = useState<boolean>(false)
  const [shouldListenMouseMove, setShouldListenMouseMove] = useState<boolean>(false)
  const [position, setPosition] = useState<Position>({
    right: "0",
    top: "0",
  })
  const codeSetRef = useRef<Set<string>>(new Set())
  const codeDOMNodeRef = useRef<HTMLElement | null>(null)

  const getCodeDOMNode = (): HTMLElement | null => {
    return codeDOMNodeRef.current
  }

  const debouncedOnMouseMove = useDebounce(
    (event: MouseEvent) => {
      const { codeDOMNode, isOutside } = getMouseInfo(event)
      if (isOutside) {
        setShown(false)

        return
      }

      if (!codeDOMNode) {
        return
      }

      codeDOMNodeRef.current = codeDOMNode

      let codeNode: CodeNode | null = null
      let _lang = ""

      editor.update(() => {
        const maybeCodeNode = $getNearestNodeFromDOMNode(codeDOMNode)

        if ($isCodeNode(maybeCodeNode)) {
          codeNode = maybeCodeNode
          _lang = codeNode.getLanguage() || ""
        }
      })

      if (codeNode) {
        const { right: editorElemRight, y: editorElemY } = anchorElem.getBoundingClientRect()
        const { right, y } = codeDOMNode.getBoundingClientRect()
        setLang(_lang)
        setShown(true)
        setPosition({
          right: `${editorElemRight - right + CODE_PADDING}px`,
          top: `${y - editorElemY}px`,
        })
      }
    },
    50,
    1000,
  )

  useEffect(() => {
    if (!shouldListenMouseMove) {
      return
    }

    document.addEventListener("mousemove", debouncedOnMouseMove)

    return () => {
      setShown(false)
      debouncedOnMouseMove.cancel()
      document.removeEventListener("mousemove", debouncedOnMouseMove)
    }
  }, [shouldListenMouseMove, debouncedOnMouseMove])

  editor.registerMutationListener(CodeNode, (mutations) => {
    editor.getEditorState().read(() => {
      for (const [key, type] of mutations) {
        switch (type) {
          case "created":
            codeSetRef.current.add(key)
            setShouldListenMouseMove(codeSetRef.current.size > 0)
            break

          case "destroyed":
            codeSetRef.current.delete(key)
            setShouldListenMouseMove(codeSetRef.current.size > 0)
            break

          default:
            break
        }
      }
    })
  })
  const codeFriendlyName = getLanguageFriendlyName(lang)

  return (
    <>
      {isShown && (
        <div
          className={classNames(
            "composer-code-action-menu-container",
            styles.codeActionMenuContainer,
          )}
          style={{ ...position }}
        >
          <div className={styles.codeHighlightLanguage}>{codeFriendlyName}</div>
          <CopyButton editor={editor} getCodeDOMNode={getCodeDOMNode} />
        </div>
      )}
    </>
  )
}
