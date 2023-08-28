/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { HashtagNode } from "@lexical/hashtag"
import { AutoLinkNode, LinkNode } from "@lexical/link"
import { ListItemNode, ListNode } from "@lexical/list"
import { HeadingNode, QuoteNode } from "@lexical/rich-text"
import { Klass, LexicalNode } from "lexical"
import { AutocompleteNode } from "../../Autocomplete/AutocompleteNode"
import { EmojiNode } from "../../Emoji/EmojiNode"
import { ImageNode } from "../../Image/ImageNode"
import { KeywordNode } from "../../Keyword/KeywordNode"
import { MentionNode } from "../../Mention/MentionNode"

export const TableCellNodes: Array<Klass<LexicalNode>> = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  HashtagNode,
  AutoLinkNode,
  LinkNode,
  ImageNode,
  MentionNode,
  EmojiNode,
  AutocompleteNode,
  KeywordNode,
]
