/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react"
import { InputInput } from "../Input/InputInput"
import { InputLabel } from "../Input/InputLabel/InputLabel"
import { InputWrapper } from "../Input/InputWrapper/InputWrapper"
import { HTMLInputTypeAttribute } from "./types"

type TextInputProps = Readonly<{
  "data-test-id"?: string
  label: string
  onChange: (val: string) => void
  placeholder?: string
  type?: HTMLInputTypeAttribute
  value: string
}>

export const TextInput = ({
  "data-test-id": dataTestId,
  label,
  onChange,
  placeholder = "",
  type = "text",
  value,
}: TextInputProps) => {
  return (
    <InputWrapper>
      <InputLabel>{label}</InputLabel>
      <InputInput
        aria-label="input"
        data-test-id={dataTestId}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </InputWrapper>
  )
}
