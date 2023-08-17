/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react"
import "../Input.css"

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
    <div className="Input__wrapper">
      <label className="Input__label">{label}</label>
      <input
        accept={accept}
        aria-label="file"
        className="Input__input"
        data-test-id={dataTestId}
        onChange={(e) => onChange(e.target.files)}
        type="file"
      />
    </div>
  )
}
