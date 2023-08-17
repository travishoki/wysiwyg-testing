/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react"
import { InputInput } from "../Input/InputInput"
import { InputLabel } from "../Input/InputLabel"
import { InputWrapper } from "../Input/InputWrapper"

type FileInputProps = Readonly<{
  accept?: string
  "data-test-id"?: string
  label: string
  onChange: (files: FileList | null) => void
}>

export const FileInput = ({
  accept,
  "data-test-id": dataTestId,
  label,
  onChange,
}: FileInputProps) => {
  return (
    <InputWrapper>
      <InputLabel>{label}</InputLabel>
      <InputInput
        accept={accept}
        aria-label="file"
        data-test-id={dataTestId}
        onChange={(e) => onChange(e.target.files)}
        type="file"
      />
    </InputWrapper>
  )
}
