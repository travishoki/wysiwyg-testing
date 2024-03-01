/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react"
import { useTranslation } from "src/i18n"
import { InputInput } from "../Input/InputInput"
import { InputLabel } from "../Input/InputLabel/InputLabel"
import { InputWrapper } from "../Input/InputWrapper/InputWrapper"

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
  const { t } = useTranslation("scenes", { keyPrefix: "composer" })

  return (
    <InputWrapper>
      <InputLabel>{label}</InputLabel>
      <InputInput
        accept={accept}
        aria-label={t("File")}
        data-test-id={dataTestId}
        onChange={(e) => onChange(e.target.files)}
        type="file"
      />
    </InputWrapper>
  )
}
