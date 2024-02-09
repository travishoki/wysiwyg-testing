import {
  camelCaseToKebab,
  getFormatTypeClass,
  getHeadingClass,
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

describe("getFormatTypeClass", () => {
  it("should return classes, provided a format number", () => {
    expect(getFormatTypeClass(1)).toEqual("composer__textBold")
    expect(getFormatTypeClass(2)).toEqual("composer__textItalic")
    expect(getFormatTypeClass(4)).toEqual("composer__textStrikethrough")
    expect(getFormatTypeClass(8)).toEqual("composer__textUnderline")
    expect(getFormatTypeClass(16)).toEqual("composer__textCode")
    expect(getFormatTypeClass(32)).toEqual("composer__textSubscript")
    expect(getFormatTypeClass(64)).toEqual("composer__textSuperscript")

    expect(getFormatTypeClass(3)).toEqual("composer__textBold composer__textItalic")
    expect(getFormatTypeClass(9)).toEqual("composer__textBold composer__textUnderline")
    expect(getFormatTypeClass(10)).toEqual("composer__textItalic composer__textUnderline")
    expect(getFormatTypeClass(11)).toEqual(
      "composer__textBold composer__textItalic composer__textUnderline",
    )
  })
})

describe("getHeadingClass", () => {
  it("should return classes, provided a type", () => {
    expect(getHeadingClass("h1")).toEqual("composer__h1")
    expect(getHeadingClass("h2")).toEqual("composer__h2")
    expect(getHeadingClass("h3")).toEqual("composer__h3")
    expect(getHeadingClass("span")).toEqual("")
  })
})
