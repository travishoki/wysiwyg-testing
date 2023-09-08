/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useCallback, useMemo, useState } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
  LexicalTypeaheadMenuPlugin,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin"
import { INSERT_TABLE_COMMAND } from "@lexical/table"
import { TextNode } from "lexical"
import * as ReactDOM from "react-dom"
import { MergeField } from "types"
import { INSERT_MERGE_FIELD_COMMAND } from "../../const"
import { IconDropdown } from "../../ui/DropDown/IconDropdown/IconDropdown"
import { TypeaheadPopover } from "../../ui/TypeaheadPopover/TypeaheadPopover"
import { ComponentPickerMenuItem } from "../ComponentPickerPlugin/ComponentPickerMenuItem/ComponentPickerMenuItem"
import { ComponentPickerOption } from "../ComponentPickerPlugin/ComponentPickerOption/ComponentPickerOption"
import styles from "../ComponentPickerPlugin/ComponentPickerPlugin.module.scss"

type MergeFieldPickerPluginProps = {
  mergeFields: MergeField[]
}

export const MergeFieldPickerPlugin = ({ mergeFields }: MergeFieldPickerPluginProps) => {
  const [editor] = useLexicalComposerContext()
  const [queryString, setQueryString] = useState<string | null>(null)

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch("{", {
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
      ...mergeFields.map(
        (mergeField) =>
          new ComponentPickerOption(mergeField.name ?? "Merge Field", {
            icon: <IconDropdown type="paragraph" />,
            keywords: ["merge-field"],
            onSelect: () => {
              const payload = {
                mergeFieldName: mergeField.name ?? "",
              }
              editor.dispatchCommand(INSERT_MERGE_FIELD_COMMAND, payload)
            },
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
  }, [editor, getDynamicOptions, mergeFields, queryString])

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
