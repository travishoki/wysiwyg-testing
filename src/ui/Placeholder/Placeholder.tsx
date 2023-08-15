/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react"
import { ReactNode } from "react"

import "./Placeholder.css"

type PlaceholderProps = {
  children: ReactNode
  className?: string
}

export const Placeholder = ({ children, className }: PlaceholderProps) => {
  return <div className={className || "Placeholder__root"}>{children}</div>
}
