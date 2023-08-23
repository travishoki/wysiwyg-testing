/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react"
import { ColorPicker } from "../../ColorPicker/ColorPicker"
import { DropDown } from "../DropDown"

type DropdownColorPickerProps = {
  buttonAriaLabel?: string
  buttonClassName: string
  buttonIconClassName?: string
  buttonLabel?: string
  color: string
  disabled?: boolean
  onChange?: (color: string) => void
  stopCloseOnClickSelf?: boolean
  title?: string
}

export const DropdownColorPicker = ({
  color,
  disabled = false,
  onChange,
  stopCloseOnClickSelf = true,
  ...rest
}: DropdownColorPickerProps) => {
  return (
    <DropDown {...rest} disabled={disabled} stopCloseOnClickSelf={stopCloseOnClickSelf}>
      <ColorPicker color={color} onChange={onChange} />
    </DropDown>
  )
}
