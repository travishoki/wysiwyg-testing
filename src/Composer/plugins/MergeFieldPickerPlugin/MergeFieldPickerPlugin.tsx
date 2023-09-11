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
import { TextNode } from "lexical"
import * as ReactDOM from "react-dom"
import { MergeField } from "types"
import { INSERT_MERGE_FIELD_COMMAND } from "../../const"
import { formatMergeFieldTitle } from "../../helpers/mergeFields.helpers"
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
  const [_queryString, setQueryString] = useState<string | null>(null)

  const checkForTriggerMatch = useBasicTypeaheadTriggerMatch("{", {
    minLength: 0,
  })

  const options = useMemo(() => {
    const baseOptions = [
      ...mergeFields.map(
        (mergeField) =>
          new ComponentPickerOption(formatMergeFieldTitle(mergeField.name) ?? "Merge Field", {
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

    return baseOptions
  }, [editor, mergeFields])

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
