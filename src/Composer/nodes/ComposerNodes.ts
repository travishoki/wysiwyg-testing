/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { CodeHighlightNode, CodeNode } from "@lexical/code"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import { ListItemNode, ListNode } from "@lexical/list"
import { OverflowNode } from "@lexical/overflow"
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table"
import { Klass, LexicalNode } from "lexical"
import { EmojiNode } from "./Emoji/EmojiNode"
import { ImageNode } from "./Image/ImageNode"
import { InlineImageNode } from "./InlineImage/InlineImageNode"
import { KeywordNode } from "./Keyword/KeywordNode"
import { MergeFieldNode } from "./MergeField/MergeFieldNode"

export const ComposerNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  CodeHighlightNode,
  AutoLinkNode,
  LinkNode,
  OverflowNode,
  MergeFieldNode,
  ImageNode,
  InlineImageNode,
  EmojiNode,
  KeywordNode,
  HorizontalRuleNode,
]
