import {
  camelCaseToKebab,
  getFormatTypeClassStyle,
  styleObjectToString,
  styleStringToObject,
} from "./MergeFieldNode.helpers"

describe("camelCaseToKebab", () => {
  it("should return string in kebab case", () => {
    const str = "fontFamily"
    const result = camelCaseToKebab(str)
    const expectedResult = "font-family"

    expect(result).toEqual(expectedResult)
  })
})

describe("styleObjectToString", () => {
  it("should return string", () => {
    const styleObj = {
      fontFamily: "Verdana",
      fontSize: "10px",
    }
    const result = styleObjectToString(styleObj)
    const expectedResult = "font-family: Verdana; font-size: 10px;"

    expect(result).toEqual(expectedResult)
  })
})

describe("styleStringToObject", () => {
  it("should return object", () => {
    const styleStr = "font-family: Verdana; font-size: 10px;"
    const result = styleStringToObject(styleStr)
    const expectedResult = {
      fontFamily: "Verdana",
      fontSize: "10px",
    }

    expect(result).toEqual(expectedResult)
  })
})

describe("getFormatTypeClassStyle", () => {
  it("should return classes, provided a format number", () => {
    expect(getFormatTypeClassStyle(1)).toEqual("composer__textBold")
    expect(getFormatTypeClassStyle(2)).toEqual("composer__textItalic")
    expect(getFormatTypeClassStyle(4)).toEqual("composer__textStrikethrough")
    expect(getFormatTypeClassStyle(8)).toEqual("composer__textUnderline")
    expect(getFormatTypeClassStyle(16)).toEqual("composer__textCode")
    expect(getFormatTypeClassStyle(32)).toEqual("composer__textSubscript")
    expect(getFormatTypeClassStyle(64)).toEqual("composer__textSuperscript")

    expect(getFormatTypeClassStyle(3)).toEqual("composer__textBold composer__textItalic")
    expect(getFormatTypeClassStyle(9)).toEqual("composer__textBold composer__textUnderline")
    expect(getFormatTypeClassStyle(10)).toEqual("composer__textItalic composer__textUnderline")
  })
})
