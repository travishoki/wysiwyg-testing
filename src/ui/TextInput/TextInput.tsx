/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react"
import { HTMLInputTypeAttribute } from "react"
import "../Input.css"

type TextInputProps = Readonly<{
  "data-test-id"?: string
  label: string
  onChange: (val: string) => void
  placeholder?: string
  value: string
  type?: HTMLInputTypeAttribute
}>

export const TextInput = ({
  label,
  value,
  onChange,
  placeholder = "",
  "data-test-id": dataTestId,
  type = "text",
}: TextInputProps) => {
  return (
    <div className="Input__wrapper">
      <label className="Input__label">{label}</label>
      <input
        aria-label="input"
        className="Input__input"
        data-test-id={dataTestId}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  )
}
