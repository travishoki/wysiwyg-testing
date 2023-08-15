/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react"
import { DialogProps } from "./DialogTypes"
import "./Dialog.css"

export function DialogActions({ "data-test-id": dataTestId, children }: DialogProps): JSX.Element {
  return (
    <div className="DialogActions" data-test-id={dataTestId}>
      {children}
    </div>
  )
}
