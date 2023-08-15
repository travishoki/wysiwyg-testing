/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react"
import { MarkdownShortcutPlugin as LexicalMarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin"
import { PLAYGROUND_TRANSFORMERS } from "../MarkdownTransformers"

export const MarkdownShortcutPlugin = () => {
  return <LexicalMarkdownShortcutPlugin transformers={PLAYGROUND_TRANSFORMERS} />
}
