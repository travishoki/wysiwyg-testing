/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { ReactNode } from "react"
import classNames from "classnames"
import styles from "./Button.module.scss"

type ButtonProps = {
  children: ReactNode
  className?: string
  "data-test-id"?: string
  disabled?: boolean
  onClick: () => void
  small?: boolean
  title?: string
}

export const Button = ({
  children,
  className,
  "data-test-id": dataTestId,
  disabled,
  onClick,
  small,
  title,
}: ButtonProps) => {
  return (
    <button
      aria-label={title}
      className={classNames(
        styles.buttonRoot,
        disabled && styles.buttonDisabled,
        small && styles.buttonSmall,
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      title={title}
      {...(dataTestId && { "data-test-id": dataTestId })}
    >
      {children}
    </button>
  )
}
