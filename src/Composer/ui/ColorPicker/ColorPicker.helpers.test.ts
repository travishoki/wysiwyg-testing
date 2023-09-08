import { hex2rgb, rgb2hex } from "./ColorPicker.helpers"

describe("hex2rgb", () => {
  test("hex2rgb", () => {
    const hex = "#ff0000"
    const result = hex2rgb(hex)
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
