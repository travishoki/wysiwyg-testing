/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react"
import classNames from "classnames"
import { InputLabel } from "../Input/InputLabel"
import { InputWrapper } from "../Input/InputWrapper"
import styles from "./Select.module.scss"

type SelectIntrinsicProps = JSX.IntrinsicElements["select"]

interface SelectProps extends SelectIntrinsicProps {
  label: string
}

export const Select = ({ children, className, label, ...other }: SelectProps) => {
  return (
    <InputWrapper>
      <InputLabel style={{ marginTop: "-1em" }}>{label}</InputLabel>
      <select
        {...other}
        className={classNames(styles.select, className || styles["select-general"])}
      >
        {children}
      </select>
    </InputWrapper>
  )
}
