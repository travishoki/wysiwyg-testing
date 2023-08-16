import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import type { TableOfContentsEntry } from "@lexical/react/LexicalTableOfContents"
import type { HeadingTagType } from "@lexical/rich-text"
import type { NodeKey } from "lexical"

const MARGIN_ABOVE_EDITOR = 624
const HEADING_WIDTH = 9

const indent = (tagName: HeadingTagType) => {
  if (tagName === "h2") {
    return "heading2"
  } else if (tagName === "h3") {
    return "heading3"
  }
}

const isHeadingAtTheTopOfThePage = (element: HTMLElement): boolean => {
  const elementYPosition = element?.getClientRects()[0].y
  return (
    elementYPosition >= MARGIN_ABOVE_EDITOR &&
    elementYPosition <= MARGIN_ABOVE_EDITOR + HEADING_WIDTH
  )
}

const isHeadingAboveViewport = (element: HTMLElement): boolean => {
  const elementYPosition = element?.getClientRects()[0].y
  return elementYPosition < MARGIN_ABOVE_EDITOR
}

const isHeadingBelowTheTopOfThePage = (element: HTMLElement): boolean => {
  const elementYPosition = element?.getClientRects()[0].y
  return elementYPosition >= MARGIN_ABOVE_EDITOR + HEADING_WIDTH
}

type TableOfContentsListProps = {
  tableOfContents: Array<TableOfContentsEntry>
}

export const TableOfContentsList = ({ tableOfContents }: TableOfContentsListProps) => {
  const [selectedKey, setSelectedKey] = useState("")
  const selectedIndex = useRef(0)
  const [editor] = useLexicalComposerContext()

  const scrollToNode = (key: NodeKey, currIndex: number) => {
    editor.getEditorState().read(() => {
      const domElement = editor.getElementByKey(key)
      if (domElement !== null) {
        domElement.scrollIntoView()
        setSelectedKey(key)
        selectedIndex.current = currIndex
      }
    })
  }

  useEffect(() => {
    const scrollCallback = () => {
      if (tableOfContents.length !== 0 && selectedIndex.current < tableOfContents.length - 1) {
        let currentHeading = editor.getElementByKey(tableOfContents[selectedIndex.current][0])
        if (currentHeading !== null) {
          if (isHeadingBelowTheTopOfThePage(currentHeading)) {
            //On natural scroll, user is scrolling up
            while (
              currentHeading !== null &&
              isHeadingBelowTheTopOfThePage(currentHeading) &&
              selectedIndex.current > 0
            ) {
              const prevHeading = editor.getElementByKey(
                tableOfContents[selectedIndex.current - 1][0],
              )
              if (
                prevHeading !== null &&
                (isHeadingAboveViewport(prevHeading) || isHeadingBelowTheTopOfThePage(prevHeading))
              ) {
                selectedIndex.current--
              }
              currentHeading = prevHeading
            }
            const prevHeadingKey = tableOfContents[selectedIndex.current][0]
            setSelectedKey(prevHeadingKey)
          } else if (isHeadingAboveViewport(currentHeading)) {
            //On natural scroll, user is scrolling down
            while (
              currentHeading !== null &&
              isHeadingAboveViewport(currentHeading) &&
              selectedIndex.current < tableOfContents.length - 1
            ) {
              const nextHeading = editor.getElementByKey(
                tableOfContents[selectedIndex.current + 1][0],
              )
              if (
                nextHeading !== null &&
                (isHeadingAtTheTopOfThePage(nextHeading) || isHeadingAboveViewport(nextHeading))
              ) {
                selectedIndex.current++
              }
              currentHeading = nextHeading
            }
            const nextHeadingKey = tableOfContents[selectedIndex.current][0]
            setSelectedKey(nextHeadingKey)
          }
        }
      } else {
        selectedIndex.current = 0
      }
    }
    let timerId: ReturnType<typeof setTimeout>

    function debounceFunction(func: () => void, delay: number) {
      clearTimeout(timerId)
      timerId = setTimeout(func, delay)
    }

    function onScroll(): void {
      debounceFunction(scrollCallback, 10)
    }

    document.addEventListener("scroll", onScroll)
    return () => document.removeEventListener("scroll", onScroll)
  }, [tableOfContents, editor])

  return (
    <div className="table-of-contents">
      <ul className="headings">
        {tableOfContents.map(([key, text, tag], index) => {
          if (index === 0) {
            return (
              <div className="normal-heading-wrapper" key={key}>
                <div
                  className="first-heading"
                  onClick={() => scrollToNode(key, index)}
                  role="button"
                  tabIndex={0}
                >
                  {("" + text).length > 20 ? text.substring(0, 20) + "..." : text}
                </div>
                <br />
              </div>
            )
          } else {
            return (
              <div
                className={`normal-heading-wrapper ${
                  selectedKey === key ? "selected-heading-wrapper" : ""
                }`}
                key={key}
              >
                <div
                  onClick={() => scrollToNode(key, index)}
                  role="button"
                  className={indent(tag)}
                  tabIndex={0}
                >
                  <li
                    className={`normal-heading ${selectedKey === key ? "selected-heading" : ""}
                    `}
                  >
                    {("" + text).length > 27 ? text.substring(0, 27) + "..." : text}
                  </li>
                </div>
              </div>
            )
          }
        })}
      </ul>
    </div>
  )
}
