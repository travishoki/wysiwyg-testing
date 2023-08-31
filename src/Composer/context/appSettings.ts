/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export type SettingName =
  | "shouldUseLexicalContextMenu"
  | "tableCellMerge"
  | "tableCellBackgroundColor"

type Settings = Record<SettingName, boolean>

export const DEFAULT_SETTINGS: Settings = {
  shouldUseLexicalContextMenu: true,
  tableCellBackgroundColor: true,
  tableCellMerge: true,
}
