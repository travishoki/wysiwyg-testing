/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AutoLinkNode, LinkNode } from "@lexical/link"
import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { Klass, LexicalNode } from "lexical"
import { EmojiNode } from "../../Emoji/EmojiNode"
import { ImageNode } from "../../Image/ImageNode"
import { KeywordNode } from "../../Keyword/KeywordNode"

export const TableCellNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  AutoLinkNode,
  LinkNode,
  ImageNode,
  EmojiNode,
  KeywordNode,
]
