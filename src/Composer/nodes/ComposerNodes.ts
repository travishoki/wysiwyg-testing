/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { CodeHighlightNode, CodeNode } from "@lexical/code"
import { HashtagNode } from "@lexical/hashtag"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import { ListItemNode, ListNode } from "@lexical/list"
import { MarkNode } from "@lexical/mark"
import { OverflowNode } from "@lexical/overflow"
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table"
import { Klass, LexicalNode } from "lexical"
import { EmojiNode } from "./Emoji/EmojiNode"
import { ImageNode } from "./Image/ImageNode"
import { InlineImageNode } from "./InlineImage/InlineImageNode"
import { KeywordNode } from "./Keyword/KeywordNode"
import { MentionNode } from "./Mention/MentionNode"
import { MergeFieldNode } from "./MergeField/MergeFieldNode"
import { TableNode as NewTableNode } from "./Table/TableNode"

export const ComposerNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  NewTableNode,
  TableNode,
  TableCellNode,
  TableRowNode,
  HashtagNode,
  CodeHighlightNode,
  AutoLinkNode,
  LinkNode,
  OverflowNode,
  MergeFieldNode,
  ImageNode,
  InlineImageNode,
  MentionNode,
  EmojiNode,
  KeywordNode,
  HorizontalRuleNode,
  MarkNode,
]
