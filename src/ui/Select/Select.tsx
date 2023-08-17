/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react"
import "./Select.css"

type SelectIntrinsicProps = JSX.IntrinsicElements["select"]

interface SelectProps extends SelectIntrinsicProps {
  label: string
}

export const Select = ({ children, className, label, ...other }: SelectProps) => {
  return (
    <div className="Input__wrapper">
      <label className="Input__label" style={{ marginTop: "-1em" }}>
        {label}
      </label>
      <select {...other} className={className || "select"}>
        {children}
      </select>
    </div>
  )
}
