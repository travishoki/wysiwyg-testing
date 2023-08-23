/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, {
  MarkdownShortcutPlugin as LexicalMarkdownShortcutPlugin,
} from "@lexical/react/LexicalMarkdownShortcutPlugin"
import { COMPOSER_TRANSFORMERS } from "../MarkdownTransformers/MarkdownTransformers"

export const MarkdownShortcutPlugin = () => {
  return <LexicalMarkdownShortcutPlugin transformers={COMPOSER_TRANSFORMERS} />
}
