/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useCallback, useMemo, useState } from "react"
import { $createCodeNode } from "@lexical/code"
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
} from "@lexical/list"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode"
import {
  LexicalTypeaheadMenuPlugin,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin"
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text"
import { $setBlocksType } from "@lexical/selection"
import { INSERT_TABLE_COMMAND } from "@lexical/table"
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  FORMAT_ELEMENT_COMMAND,
  TextNode,
} from "lexical"
import * as ReactDOM from "react-dom"
import { alignmentTypes } from "../../Icon/types"
import { TypeaheadPopover } from "../../TypeaheadPopover/TypeaheadPopover"
import { useModal } from "../../hooks/useModal"
import { IconDropdown } from "../../ui/DropDown/IconDropdown/IconDropdown"
import { InsertImageDialog } from "../ImagesPlugin/InsertImageDialog/InsertImageDialog"
import { InsertNewTableDialog } from "../TablePlugin/InsertNewTableDialog/InsertNewTableDialog"
import { InsertTableDialog } from "../TablePlugin/InsertTableDialog/InsertTableDialog"
import { ComponentPickerMenuItem } from "./ComponentPickerMenuItem/ComponentPickerMenuItem"
import { ComponentPickerOption } from "./ComponentPickerOption/ComponentPickerOption"
import { getAlignmentType, getHeadingType } from "./ComponentPickerPlugin.helpers"
import styles from "./ComponentPickerPlugin.module.scss"

const alignmentList: alignmentTypes[] = ["left", "center", "right", "justify"]

export const ComponentPickerPlugin = () => {
  const [editor] = useLexicalComposerContext()
  const [modal, showModal] = useModal()
  const [queryString, setQueryString] = useState<string | null>(null)

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch("/", {
    minLength: 0,
  })

  const getDynamicOptions = useCallback(() => {
    const options: Array<ComponentPickerOption> = []

    if (queryString == null) {
      return options
    }

    const fullTableRegex = new RegExp(/^([1-9]|10)x([1-9]|10)$/)
    const partialTableRegex = new RegExp(/^([1-9]|10)x?$/)

    const fullTableMatch = fullTableRegex.exec(queryString)
    const partialTableMatch = partialTableRegex.exec(queryString)

    if (fullTableMatch) {
      const [rows, columns] = fullTableMatch[0].split("x").map((n: string) => parseInt(n, 10))

      options.push(
        new ComponentPickerOption(`${rows}x${columns} Table`, {
          icon: <IconDropdown type="table" />,
          keywords: ["table"],
          onSelect: () =>
            // @ts-ignore Correct types, but since they're dynamic TS doesn't like it.
            editor.dispatchCommand(INSERT_TABLE_COMMAND, { columns, rows }),
        }),
      )
    } else if (partialTableMatch) {
      const rows = parseInt(partialTableMatch[0], 10)

      options.push(
        ...Array.from({ length: 5 }, (_, i) => i + 1).map(
          (columns) =>
            new ComponentPickerOption(`${rows}x${columns} Table`, {
              icon: <IconDropdown type="table" />,
              keywords: ["table"],
              onSelect: () =>
                // @ts-ignore Correct types, but since they're dynamic TS doesn't like it.
                editor.dispatchCommand(INSERT_TABLE_COMMAND, { columns, rows }),
            }),
        ),
      )
    }

    return options
  }, [editor, queryString])

  const options = useMemo(() => {
    const baseOptions = [
      new ComponentPickerOption("Paragraph", {
        icon: <IconDropdown type="paragraph" />,
        keywords: ["normal", "paragraph", "p", "text"],
        onSelect: () =>
          editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createParagraphNode())
            }
          }),
      }),
      ...Array.from({ length: 3 }, (_, i) => i + 1).map(
        (n) =>
          new ComponentPickerOption(`Heading ${n}`, {
            icon: <IconDropdown type={getHeadingType(n)} />,
            keywords: ["heading", "header", `h${n}`],
            onSelect: () =>
              editor.update(() => {
                const selection = $getSelection()
                if ($isRangeSelection(selection)) {
                  $setBlocksType(selection, () =>
                    // @ts-ignore Correct types, but since they're dynamic TS doesn't like it.
                    $createHeadingNode(`h${n}`),
                  )
                }
              }),
          }),
      ),
      new ComponentPickerOption("Table", {
        icon: <IconDropdown type="table" />,
        keywords: ["table", "grid", "spreadsheet", "rows", "columns"],
        onSelect: () =>
          showModal("Insert Table", (onClose) => (
            <InsertTableDialog activeEditor={editor} onClose={onClose} />
          )),
      }),
      new ComponentPickerOption("Table (Experimental)", {
        icon: <IconDropdown type="table" />,
        keywords: ["table", "grid", "spreadsheet", "rows", "columns"],
        onSelect: () =>
          showModal("Insert Table", (onClose) => (
            <InsertNewTableDialog activeEditor={editor} onClose={onClose} />
          )),
      }),
      new ComponentPickerOption("Numbered List", {
        icon: <IconDropdown type="number" />,
        keywords: ["numbered list", "ordered list", "ol"],
        onSelect: () => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined),
      }),
      new ComponentPickerOption("Bulleted List", {
        icon: <IconDropdown type="bullet" />,
        keywords: ["bulleted list", "unordered list", "ul"],
        onSelect: () => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined),
      }),
      new ComponentPickerOption("Check List", {
        icon: <IconDropdown type="check" />,
        keywords: ["check list", "todo list"],
        onSelect: () => editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined),
      }),
      new ComponentPickerOption("Quote", {
        icon: <IconDropdown type="quote" />,
        keywords: ["block quote"],
        onSelect: () =>
          editor.update(() => {
            const selection = $getSelection()
            if ($isRangeSelection(selection)) {
              $setBlocksType(selection, () => $createQuoteNode())
            }
          }),
      }),
      new ComponentPickerOption("Code", {
        icon: <IconDropdown type="code" />,
        keywords: ["javascript", "python", "js", "codeblock"],
        onSelect: () =>
          editor.update(() => {
            const selection = $getSelection()

            if ($isRangeSelection(selection)) {
              if (selection.isCollapsed()) {
                $setBlocksType(selection, () => $createCodeNode())
              } else {
                // Will this ever happen?
                const textContent = selection.getTextContent()
                const codeNode = $createCodeNode()
                selection.insertNodes([codeNode])
                selection.insertRawText(textContent)
              }
            }
          }),
      }),
      new ComponentPickerOption("Divider", {
        icon: <IconDropdown type="horizontal-rule" />,
        keywords: ["horizontal rule", "divider", "hr"],
        onSelect: () => editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined),
      }),
      new ComponentPickerOption("Image", {
        icon: <IconDropdown type="image" />,
        keywords: ["image", "photo", "picture", "file"],
        onSelect: () =>
          showModal("Insert Image", (onClose) => (
            <InsertImageDialog activeEditor={editor} onClose={onClose} />
          )),
      }),
      ...alignmentList.map(
        (alignment) =>
          new ComponentPickerOption(`Align ${alignment}`, {
            icon: <IconDropdown type={getAlignmentType(alignment)} />,
            keywords: ["align", "justify", alignment],
            onSelect: () =>
              // @ts-ignore Correct types, but since they're dynamic TS doesn't like it.
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment),
          }),
      ),
    ]

    const dynamicOptions = getDynamicOptions()

    return queryString
      ? [
          ...dynamicOptions,
          ...baseOptions.filter((option) => {
            return new RegExp(queryString, "gi").exec(option.title) || option.keywords != null
              ? option.keywords.some((keyword) => new RegExp(queryString, "gi").exec(keyword))
              : false
          }),
        ]
      : baseOptions
  }, [editor, getDynamicOptions, queryString, showModal])

  const onSelectOption = useCallback(
    (
      selectedOption: ComponentPickerOption,
      nodeToRemove: TextNode | null,
      closeMenu: () => void,
      matchingString: string,
    ) => {
      editor.update(() => {
        if (nodeToRemove) {
          nodeToRemove.remove()
        }
        selectedOption.onSelect(matchingString)
        closeMenu()
      })
    },
    [editor],
  )

  return (
    <>
      {modal}
      <LexicalTypeaheadMenuPlugin<ComponentPickerOption>
        menuRenderFn={(
          anchorElementRef,
          { selectOptionAndCleanUp, selectedIndex, setHighlightedIndex },
        ) =>
          anchorElementRef.current && options.length
            ? ReactDOM.createPortal(
                <TypeaheadPopover className={styles.componentPickerMenu}>
                  <ul>
                    {options.map((option, i: number) => (
                      <ComponentPickerMenuItem
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
        triggerFn={checkForTriggerMatch}
      />
    </>
  )
}
