import {
  camelCaseToKebab,
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
