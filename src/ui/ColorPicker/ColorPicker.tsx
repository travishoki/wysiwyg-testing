/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useEffect, useMemo, useRef, useState } from "react"
import { TextInput } from "../TextInput/TextInput"
import styles from "./ColorPicker.module.scss"
import { MoveWrapper, Position } from "./MoveWrapper/MoveWrapper"
import { transformColor } from "./helpers"

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
    <div className={styles.colorPickerWrapper} ref={innerDivRef} style={{ width: WIDTH }}>
      <TextInput label="Hex" onChange={onSetHex} value={inputColor} />
      <div className={styles.colorPickerBasicColor}>
        {basicColors.map((basicColor) => (
          <button
            aria-label="color picker"
            className={basicColor === selfColor.hex ? styles.activeColor : ""}
            key={basicColor}
            onClick={() => {
              setInputColor(basicColor)
              setSelfColor(transformColor("hex", basicColor))
            }}
            style={{ backgroundColor: basicColor }}
          />
        ))}
      </div>
      <MoveWrapper
        className={styles.colorPickerSaturation}
        onChange={onMoveSaturation}
        style={{ backgroundColor: `hsl(${selfColor.hsv.h}, 100%, 50%)` }}
      >
        <div
          className={styles.colorPickerSaturationCursor}
          style={{
            backgroundColor: selfColor.hex,
            left: saturationPosition.x,
            top: saturationPosition.y,
          }}
        />
      </MoveWrapper>
      <MoveWrapper className={styles.colorPickerHue} onChange={onMoveHue}>
        <div
          className={styles.colorPickerHueCursor}
          style={{
            backgroundColor: `hsl(${selfColor.hsv.h}, 100%, 50%)`,
            left: huePosition.x,
          }}
        />
      </MoveWrapper>
      <div className={styles.colorPickerColor} style={{ backgroundColor: selfColor.hex }} />
    </div>
  )
}
