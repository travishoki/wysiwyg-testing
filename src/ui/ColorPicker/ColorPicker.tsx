/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { TextInput } from "../TextInput/TextInput"
import { MoveWrapper, Position } from "./MoveWrapper"
import { transformColor } from "./helpers"
import "./ColorPicker.css"

interface ColorPickerProps {
  color: string
  onChange?: (color: string) => void
}

const basicColors = [
  "#d0021b",
  "#f5a623",
  "#f8e71c",
  "#8b572a",
  "#7ed321",
  "#417505",
  "#bd10e0",
  "#9013fe",
  "#4a90e2",
  "#50e3c2",
  "#b8e986",
  "#000000",
  "#4a4a4a",
  "#9b9b9b",
  "#ffffff",
]

const WIDTH = 214
const HEIGHT = 150

export const ColorPicker = ({ color, onChange }: Readonly<ColorPickerProps>) => {
  const [selfColor, setSelfColor] = useState(transformColor("hex", color))
  const [inputColor, setInputColor] = useState(color)
  const innerDivRef = useRef(null)

  const saturationPosition = useMemo(
    () => ({
      x: (selfColor.hsv.s / 100) * WIDTH,
      y: ((100 - selfColor.hsv.v) / 100) * HEIGHT,
    }),
    [selfColor.hsv.s, selfColor.hsv.v],
  )

  const huePosition = useMemo(
    () => ({
      x: (selfColor.hsv.h / 360) * WIDTH,
    }),
    [selfColor.hsv],
  )

  const onSetHex = (hex: string) => {
    setInputColor(hex)
    if (/^#[0-9A-Fa-f]{6}$/i.test(hex)) {
      const newColor = transformColor("hex", hex)
      setSelfColor(newColor)
    }
  }

  const onMoveSaturation = ({ x, y }: Position) => {
    const newHsv = {
      ...selfColor.hsv,
      s: (x / WIDTH) * 100,
      v: 100 - (y / HEIGHT) * 100,
    }
    const newColor = transformColor("hsv", newHsv)
    setSelfColor(newColor)
    setInputColor(newColor.hex)
  }

  const onMoveHue = ({ x }: Position) => {
    const newHsv = { ...selfColor.hsv, h: (x / WIDTH) * 360 }
    const newColor = transformColor("hsv", newHsv)

    setSelfColor(newColor)
    setInputColor(newColor.hex)
  }

  useEffect(() => {
    // Check if the dropdown is actually active
    if (innerDivRef.current !== null && onChange) {
      onChange(selfColor.hex)
      setInputColor(selfColor.hex)
    }
  }, [selfColor, onChange])

  useEffect(() => {
    if (color === undefined) return
    const newColor = transformColor("hex", color)
    setSelfColor(newColor)
    setInputColor(newColor.hex)
  }, [color])

  return (
    <div className="color-picker-wrapper" style={{ width: WIDTH }} ref={innerDivRef}>
      <TextInput label="Hex" onChange={onSetHex} value={inputColor} />
      <div className="color-picker-basic-color">
        {basicColors.map((basicColor) => (
          <button
            className={basicColor === selfColor.hex ? " active" : ""}
            key={basicColor}
            style={{ backgroundColor: basicColor }}
            onClick={() => {
              setInputColor(basicColor)
              setSelfColor(transformColor("hex", basicColor))
            }}
          />
        ))}
      </div>
      <MoveWrapper
        className="color-picker-saturation"
        style={{ backgroundColor: `hsl(${selfColor.hsv.h}, 100%, 50%)` }}
        onChange={onMoveSaturation}
      >
        <div
          className="color-picker-saturation_cursor"
          style={{
            backgroundColor: selfColor.hex,
            left: saturationPosition.x,
            top: saturationPosition.y,
          }}
        />
      </MoveWrapper>
      <MoveWrapper className="color-picker-hue" onChange={onMoveHue}>
        <div
          className="color-picker-hue_cursor"
          style={{
            backgroundColor: `hsl(${selfColor.hsv.h}, 100%, 50%)`,
            left: huePosition.x,
          }}
        />
      </MoveWrapper>
      <div className="color-picker-color" style={{ backgroundColor: selfColor.hex }} />
    </div>
  )
}
