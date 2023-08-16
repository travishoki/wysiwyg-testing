/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react"
import { createPortal } from "react-dom"
import { CodeActionMenuContainer } from "./CodeActionMenuContainer"
import "./index.css"

type CodeActionMenuPluginProps = {
  anchorElem?: HTMLElement
}

export const CodeActionMenuPlugin = ({
  anchorElem = document.body,
}: CodeActionMenuPluginProps): React.ReactPortal | null => {
  return createPortal(<CodeActionMenuContainer anchorElem={anchorElem} />, anchorElem)
}
