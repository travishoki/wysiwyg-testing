/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export type SettingName =
  | "disableBeforeInput"
  | "measureTypingPerf"
  | "isCharLimit"
  | "isMaxLength"
  | "isCharLimitUtf8"
  | "isAutocomplete"
  | "shouldUseLexicalContextMenu"
  | "showNestedEditorTreeView"
  | "emptyEditor"
  | "showTableOfContents"
  | "tableCellMerge"
  | "tableCellBackgroundColor"

type Settings = Record<SettingName, boolean>

export const DEFAULT_SETTINGS: Settings = {
  disableBeforeInput: false,
  emptyEditor: false,
  isAutocomplete: false,
  isCharLimit: false,
  isCharLimitUtf8: false,
  isMaxLength: false,
  measureTypingPerf: false,
  shouldUseLexicalContextMenu: false,
  showNestedEditorTreeView: false,
  showTableOfContents: false,
  tableCellBackgroundColor: true,
  tableCellMerge: true,
}
