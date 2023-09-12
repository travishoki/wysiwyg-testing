import { getHeadingType } from "./ComponentPickerPlugin.helpers"

describe("getHeadingType", () => {
  it("should return correct heading by num", () => {
    expect(getHeadingType(1)).toEqual("h1")
    expect(getHeadingType(2)).toEqual("h2")
    expect(getHeadingType(3)).toEqual("h3")
    expect(getHeadingType(4)).toEqual("h4")
    expect(getHeadingType(5)).toEqual("h5")
  })
})
