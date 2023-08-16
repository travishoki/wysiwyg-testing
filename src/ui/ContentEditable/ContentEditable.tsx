/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react"
import { ContentEditable as LexicalContentEditable } from "@lexical/react/LexicalContentEditable"
import "./ContentEditable.css"

type ContentEditableProps = {
  className?: string
}

export const ContentEditable = ({ className }: ContentEditableProps) => {
  return <LexicalContentEditable className={className || "ContentEditable__root"} />
}
