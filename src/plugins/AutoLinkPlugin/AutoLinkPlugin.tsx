/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from "react"
import { AutoLinkPlugin as LexicalAutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin"
import { MATCHERS } from "./const"

export const AutoLinkPlugin = () => {
  return <LexicalAutoLinkPlugin matchers={MATCHERS} />
}