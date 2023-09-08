import { hex2rgb, hsv2rgb, rgb2hex, rgb2hsv, transformColor } from "./ColorPicker.helpers"

describe("hex2rgb", () => {
  test("hex2rgb", () => {
    const hex = "#ff0000"
    const result = hex2rgb(hex)
    const exectedResult = { b: 0, g: 0, r: 255 }
    expect(result).toEqual(exectedResult)
  })
})

describe("rgb2hsv", () => {
  test("rgb2hsv", () => {
    const rgb = { b: 0, g: 0, r: 255 }
    const result = rgb2hsv(rgb)
    const exectedResult = { h: 0, s: 100, v: 100 }
    expect(result).toEqual(exectedResult)
  })
})

describe("hsv2rgb", () => {
  test("hsv2rgb", () => {
    const hsv = { h: 0, s: 100, v: 100 }
    const result = hsv2rgb(hsv)
    const exectedResult = { b: 0, g: 0, r: 255 }
    expect(result).toEqual(exectedResult)
  })
})

describe("rgb2hex", () => {
  test("rgb2hex", () => {
    const rgb = { b: 0, g: 0, r: 255 }
    const result = rgb2hex(rgb)
    const exectedResult = "#ff0000"
    expect(result).toEqual(exectedResult)
  })
})

describe("transformColor", () => {
  test("hex", () => {
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

  test("rgb", () => {
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

  test("hsv", () => {
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
