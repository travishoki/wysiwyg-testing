/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from "react"
import { $patchStyleText } from "@lexical/selection"
import classNames from "classnames"
import { $getSelection, $isRangeSelection, LexicalEditor } from "lexical"
import styles from "./FontSize.module.scss"
import { MAX_ALLOWED_FONT_SIZE, MIN_ALLOWED_FONT_SIZE } from "./const"
import { calculateNextFontSize } from "./helpers"
import { updateFontSizeType } from "./types"

type FontSizeProps = {
  disabled: boolean
  editor: LexicalEditor
  selectionFontSize: string
}

export const FontSize = ({ disabled, editor, selectionFontSize }: FontSizeProps) => {
  const [inputValue, setInputValue] = React.useState<string>(selectionFontSize)

  // Patches the selection with the updated font size.
  const updateFontSizeInSelection = React.useCallback(
    (newFontSize: string | null, _updateType: updateFontSizeType | null) => {
      editor.update(() => {
        if (editor.isEditable()) {
          const selection = $getSelection()
          if (selection !== null) {
            if ($isRangeSelection(selection)) {
              $patchStyleText(selection, {
                "font-size": newFontSize,
              })
            }
          }
        }
      })
    },
    [editor],
  )

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValueNumber = Number(inputValue)

    if (["e", "E", "+", "-"].includes(e.key) || isNaN(inputValueNumber)) {
      e.preventDefault()
      setInputValue("")

      return
    }

    if (e.key === "Enter") {
      e.preventDefault()

      let updatedFontSize = inputValueNumber
      if (inputValueNumber > MAX_ALLOWED_FONT_SIZE) {
        updatedFontSize = MAX_ALLOWED_FONT_SIZE
      } else if (inputValueNumber < MIN_ALLOWED_FONT_SIZE) {
        updatedFontSize = MIN_ALLOWED_FONT_SIZE
      }
      setInputValue(String(updatedFontSize))
      updateFontSizeInSelection(`${updatedFontSize}px`, null)
    }
  }

  const handleButtonClick = (updateType: updateFontSizeType) => {
    if (inputValue !== "") {
      const nextFontSize = calculateNextFontSize(Number(inputValue), updateType)
      updateFontSizeInSelection(`${nextFontSize}px`, null)
    } else {
      updateFontSizeInSelection(null, updateType)
    }
  }

  React.useEffect(() => {
    setInputValue(selectionFontSize)
  }, [selectionFontSize])

  return (
    <>
      <button
        className={classNames(styles["toolbar-item"], styles["font-decrement"])}
        disabled={
          disabled || (selectionFontSize !== "" && Number(inputValue) <= MIN_ALLOWED_FONT_SIZE)
        }
        onClick={() => handleButtonClick(updateFontSizeType.decrement)}
        type="button"
      >
        <i className={classNames(styles.format, styles["minus-icon"])} />
      </button>

      <input
        aria-label="Font size"
        className={classNames(styles["toolbar-item"], styles["font-size-input"])}
        disabled={disabled}
        max={MAX_ALLOWED_FONT_SIZE}
        min={MIN_ALLOWED_FONT_SIZE}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyPress}
        role="button"
        type="number"
        value={inputValue}
      />

      <button
        className={classNames(styles["toolbar-item"], styles["font-increment"])}
        disabled={
          disabled || (selectionFontSize !== "" && Number(inputValue) >= MAX_ALLOWED_FONT_SIZE)
        }
        onClick={() => handleButtonClick(updateFontSizeType.increment)}
        type="button"
      >
        <i className={classNames(styles.format, styles["add-icon"])} />
      </button>
    </>
  )
}
