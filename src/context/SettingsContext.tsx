/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react"
import { createContext, useContext } from "react"
import { DEFAULT_SETTINGS, SettingName } from "../appSettings"

type SettingsContextShape = {
  setOption: (name: SettingName, value: boolean) => void
  settings: Record<SettingName, boolean>
}

const Context: React.Context<SettingsContextShape> = createContext({
  setOption: (_name: SettingName, _value: boolean) => {
    return
  },
  settings: DEFAULT_SETTINGS,
})

export const useSettings = (): SettingsContextShape => {
  return useContext(Context)
}
