/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react"

import "../Input.css"

type FileInputProps = Readonly<{
  "data-test-id"?: string
  accept?: string
  label: string
  onChange: (files: FileList | null) => void
}>

export const FileInput = ({
  accept,
  label,
  onChange,
  "data-test-id": dataTestId,
}: FileInputProps) => {
  return (
    <div className="Input__wrapper">
      <label className="Input__label">{label}</label>
      <input
        aria-label="file"
        type="file"
        accept={accept}
        className="Input__input"
        onChange={(e) => onChange(e.target.files)}
        data-test-id={dataTestId}
      />
    </div>
  )
}
