/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react"
import styles from "./Dialog.module.scss"
import { DialogProps } from "./types"

export const DialogActions = ({ children, "data-test-id": dataTestId }: DialogProps) => {
  return (
    <div className={styles.dialogActions} data-test-id={dataTestId}>
      {children}
    </div>
  )
}
