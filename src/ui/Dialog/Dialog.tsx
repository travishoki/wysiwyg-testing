/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react"
import { DialogProps } from "./types"
import "./Dialog.css"
import styles from "./Dialog.module.scss"

export const DialogActions = ({ children, "data-test-id": dataTestId }: DialogProps) => {
  return (
    <div className={styles.DialogActions} data-test-id={dataTestId}>
      {children}
    </div>
  )
}
