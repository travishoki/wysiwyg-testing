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
import { AutocompleteNode } from "./AutocompleteNode"
import { EmojiNode } from "./EmojiNode"
import { ImageNode } from "./Image/ImageNode"
import { InlineImageNode } from "./InlineImage/InlineImageNode"
import { KeywordNode } from "./KeywordNode"
import { MentionNode } from "./MentionNode"
import { MergeFieldNode } from "./MergeFieldNode"
import { TableNode as NewTableNode } from "./TableNode"
import type { Klass, LexicalNode } from "lexical"

export const PlaygroundNodes: Array<Klass<LexicalNode>> = [
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
  AutocompleteNode,
  KeywordNode,
  HorizontalRuleNode,
  MarkNode,
]
