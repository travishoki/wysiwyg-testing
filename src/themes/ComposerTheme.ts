/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { EditorThemeClasses } from "lexical"

import "./ComposerTheme.css"

const theme: EditorThemeClasses = {
  blockCursor: "ComposerTheme__blockCursor",
  characterLimit: "ComposerTheme__characterLimit",
  code: "ComposerTheme__code",
  codeHighlight: {
    atrule: "ComposerTheme__tokenAttr",
    attr: "ComposerTheme__tokenAttr",
    boolean: "ComposerTheme__tokenProperty",
    builtin: "ComposerTheme__tokenSelector",
    cdata: "ComposerTheme__tokenComment",
    char: "ComposerTheme__tokenSelector",
    class: "ComposerTheme__tokenFunction",
    "class-name": "ComposerTheme__tokenFunction",
    comment: "ComposerTheme__tokenComment",
    constant: "ComposerTheme__tokenProperty",
    deleted: "ComposerTheme__tokenProperty",
    doctype: "ComposerTheme__tokenComment",
    entity: "ComposerTheme__tokenOperator",
    function: "ComposerTheme__tokenFunction",
    important: "ComposerTheme__tokenVariable",
    inserted: "ComposerTheme__tokenSelector",
    keyword: "ComposerTheme__tokenAttr",
    namespace: "ComposerTheme__tokenVariable",
    number: "ComposerTheme__tokenProperty",
    operator: "ComposerTheme__tokenOperator",
    prolog: "ComposerTheme__tokenComment",
    property: "ComposerTheme__tokenProperty",
    punctuation: "ComposerTheme__tokenPunctuation",
    regex: "ComposerTheme__tokenVariable",
    selector: "ComposerTheme__tokenSelector",
    string: "ComposerTheme__tokenSelector",
    symbol: "ComposerTheme__tokenProperty",
    tag: "ComposerTheme__tokenProperty",
    url: "ComposerTheme__tokenOperator",
    variable: "ComposerTheme__tokenVariable",
  },
  embedBlock: {
    base: "ComposerTheme__embedBlock",
    focus: "ComposerTheme__embedBlockFocus",
  },
  hashtag: "ComposerTheme__hashtag",
  heading: {
    h1: "ComposerTheme__h1",
    h2: "ComposerTheme__h2",
    h3: "ComposerTheme__h3",
    h4: "ComposerTheme__h4",
    h5: "ComposerTheme__h5",
    h6: "ComposerTheme__h6",
  },
  image: "editor-image",
  indent: "ComposerTheme__indent",
  inlineImage: "inline-editor-image",
  link: "ComposerTheme__link",
  list: {
    listitem: "ComposerTheme__listItem",
    listitemChecked: "ComposerTheme__listItemChecked",
    listitemUnchecked: "ComposerTheme__listItemUnchecked",
    nested: {
      listitem: "ComposerTheme__nestedListItem",
    },
    olDepth: [
      "ComposerTheme__ol1",
      "ComposerTheme__ol2",
      "ComposerTheme__ol3",
      "ComposerTheme__ol4",
      "ComposerTheme__ol5",
    ],
    ul: "ComposerTheme__ul",
  },
  ltr: "ComposerTheme__ltr",
  mark: "ComposerTheme__mark",
  markOverlap: "ComposerTheme__markOverlap",
  paragraph: "ComposerTheme__paragraph",
  quote: "ComposerTheme__quote",
  rtl: "ComposerTheme__rtl",
  table: "ComposerTheme__table",
  tableAddColumns: "ComposerTheme__tableAddColumns",
  tableAddRows: "ComposerTheme__tableAddRows",
  tableCell: "ComposerTheme__tableCell",
  tableCellActionButton: "ComposerTheme__tableCellActionButton",
  tableCellActionButtonContainer: "ComposerTheme__tableCellActionButtonContainer",
  tableCellEditing: "ComposerTheme__tableCellEditing",
  tableCellHeader: "ComposerTheme__tableCellHeader",
  tableCellPrimarySelected: "ComposerTheme__tableCellPrimarySelected",
  tableCellResizer: "ComposerTheme__tableCellResizer",
  tableCellSelected: "ComposerTheme__tableCellSelected",
  tableCellSortedIndicator: "ComposerTheme__tableCellSortedIndicator",
  tableResizeRuler: "ComposerTheme__tableCellResizeRuler",
  tableSelected: "ComposerTheme__tableSelected",
  tableSelection: "ComposerTheme__tableSelection",
  text: {
    bold: "ComposerTheme__textBold",
    code: "ComposerTheme__textCode",
    italic: "ComposerTheme__textItalic",
    strikethrough: "ComposerTheme__textStrikethrough",
    subscript: "ComposerTheme__textSubscript",
    superscript: "ComposerTheme__textSuperscript",
    underline: "ComposerTheme__textUnderline",
    underlineStrikethrough: "ComposerTheme__textUnderlineStrikethrough",
  },
}

export default theme
