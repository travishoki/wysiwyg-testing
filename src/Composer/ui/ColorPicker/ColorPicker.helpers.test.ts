import { hex2rgb, hsv2rgb, rgb2hex, rgb2hsv, toHex, transformColor } from "./ColorPicker.helpers"

describe("hex2rgb", () => {
  test("should convert hex -> rgb", () => {
    const hex = "#ff0000"
    const result = hex2rgb(hex)
    const exectedResult = { b: 0, g: 0, r: 255 }
    expect(result).toEqual(exectedResult)
  })
})

describe("rgb2hsv", () => {
  test("should convert rgb -> hsv", () => {
    const rgb = { b: 0, g: 0, r: 255 }
    const result = rgb2hsv(rgb)
    const exectedResult = { h: 0, s: 100, v: 100 }
    expect(result).toEqual(exectedResult)
  })
})

describe("hsv2rgb", () => {
  test("should convert hsv -> rgb", () => {
    const hsv = { h: 0, s: 100, v: 100 }
    const result = hsv2rgb(hsv)
    const exectedResult = { b: 0, g: 0, r: 255 }
    expect(result).toEqual(exectedResult)
  })
})

describe("rgb2hex", () => {
  test("should convert rgb -> hex", () => {
    const rgb = { b: 0, g: 0, r: 255 }
    const result = rgb2hex(rgb)
    const exectedResult = "#ff0000"
    expect(result).toEqual(exectedResult)
  })
})

describe("toHex", () => {
  test("should return value, if given a 6 digit hex", () => {
    const value = "#ff0000"
    const result = toHex(value)
    const exectedResult = value
    expect(result).toEqual(exectedResult)
  })

  test("should return value, if given a 3 digit hex", () => {
    const value = "#f00"
    const result = toHex(value)
    const exectedResult = "#ff0000"
    expect(result).toEqual(exectedResult)
  })
})

describe("transformColor", () => {
  test("should return all value for a given hex", () => {
    const format = "hex"
    const color = "#ff0000"
    const result = transformColor(format, color)
    const exectedResult = {
      hex: color,
      hsv: rgb2hsv(hex2rgb(color)),
      rgb: hex2rgb(color),
    }
    expect(result).toEqual(exectedResult)
  })

  test("should return all value for a given rgb", () => {
    const format = "rgb"
    const color = { b: 0, g: 0, r: 255 }
    const result = transformColor(format, color)
    const exectedResult = {
      hex: rgb2hex(color),
      hsv: rgb2hsv(color),
      rgb: color,
    }
    expect(result).toEqual(exectedResult)
  })

  test("should return all value for a given hsv", () => {
    const format = "hsv"
    const color = { h: 0, s: 100, v: 100 }
    const result = transformColor(format, color)
    const exectedResult = {
      hex: rgb2hex(hsv2rgb(color)),
      hsv: color,
      rgb: hsv2rgb(color),
    }
    expect(result).toEqual(exectedResult)
  })
})
